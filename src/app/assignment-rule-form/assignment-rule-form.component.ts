///<reference path="../../../node_modules/@angular/forms/src/form_builder.d.ts"/>
import { Component, OnInit  } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray} from "@angular/forms";

import { AssignmentRule, CommissionBackEndService, Assignee } from "../commission-back-end.service";
import { SalesPerson, MasterDataService } from "../master-data.service";
import { RavagoEntityImpl } from "../models/ravago-entity-impl";
import { RuleDTOimpl } from "../models/create-rule-dto";
import { AssignmentRuleImpl } from "../models/assignment-rule-impl";
import { CustomerImpl } from "../models/customer-impl";
import { AssignmentValueImpl } from "../models/assignment-value-impl";
import { PeriodImpl } from "../models/period-impl";
import { AssigneeImpl } from "../models/assignee-impl";
import { SalesPersonImpl } from "../models/sales-person-impl";

@Component({
  selector: 'assignment-rule-form',
  templateUrl: './assignment-rule-form.component.html',
  styleUrls: ['./assignment-rule-form.component.css']
})
export class AssignmentRuleFormComponent implements OnInit {
  public errorMessage;
  public createResponse;
  entities : RavagoEntityImpl[] = [new RavagoEntityImpl("533714","MUEHLSTEIN"),new RavagoEntityImpl("597612","MUEHLSTEIN CA"),new RavagoEntityImpl("515785","CPA")];
  customers : CustomerImpl[] = [
    new CustomerImpl("587505","CHANNEL PRIME ALLIANCE CANADA"),
    new CustomerImpl("515785","CHANNEL PRIME ALLIANCE "),
    new CustomerImpl("634632","QUALITY RESIN SOLUTIONS"),
    new CustomerImpl("553932","ABM NORTH AMERICA CORP"),
    new CustomerImpl("630133","ABSA RESIN TECHNOLOGIES INC"),
    new CustomerImpl("630146","AIR MOLDED PLASTICS"),
    new CustomerImpl("630150","ALLIANCE HANGER INC"),
    new CustomerImpl("630254","CRAWLING VALLEY PLASTICS LIMITED"),
    new CustomerImpl("630166","AMPACET CANADA COMPANY"),
    new CustomerImpl("630173","APOLLO HEALTH AND BEAUTY CARE"),
    new CustomerImpl("630178","ARMAGEDON GLOBAL ENERGY SOLUTIONS CORP"),
    new CustomerImpl("630180","ARMTEC LIMITED PARTNERSHIP")
  ]
  public createForm : FormGroup;

  constructor(private commissionService:CommissionBackEndService,private masterDataService :MasterDataService, private _fb: FormBuilder) {

  }

  ngOnInit() {
    this.createForm = this._fb.group(
      {
        legalEntity: ['', [Validators.required, Validators.minLength(5)]],
        customer: ['',Validators.required],
        startDate: ['',Validators.required],
        endDate: [''],
        salespersons : this._fb.array([
          this.initSalesPerson()
        ])
      }
    );
  }

  addSalesPerson() {
    const control = <FormArray>this.createForm.controls['salespersons'];
    control.push(this.initSalesPerson());
  }

  save(create : FormGroup){
    var ruleDto = new RuleDTOimpl();
    ruleDto.customer = new CustomerImpl(this.createForm.controls['customer'].value.reference,this.createForm.controls['customer'].value.callSign);
    ruleDto.ravagoEntity = new RavagoEntityImpl(this.createForm.controls['legalEntity'].value.reference,this.createForm.controls['legalEntity'].value.callSign);

    var assignmentValues :AssignmentValueImpl[] = [];
    var assignees : Assignee[] = [];
    var salesreps = this.createForm.controls['salespersons'].value;

    for(var sp of salesreps){
      console.log("add" + sp.selectcommission);
      var curSp = new SalesPersonImpl(sp.salesperson.ID,sp.salesperson.firstName,sp.salesperson.lastName);
      var currentAssignee = new AssigneeImpl(sp.selectSalesVolume,sp.selectcommission,curSp);
      assignees.push(currentAssignee);
    }

    var period : PeriodImpl = new PeriodImpl(this.createForm.controls['startDate'].value,this.createForm.controls['endDate'].value)
    var assignmentToAdd = new AssignmentValueImpl(period,assignees);

    assignmentValues.push(assignmentToAdd);

    ruleDto.assignmentValues = assignmentValues;
    this.commissionService.createDefaultRule(ruleDto).subscribe(
      response => { console.log("Create rule status : " + response);},
      err => this.errorMessage = err,
      () => console.log("Done")
    );
  }

  public salesPersons : SalesPerson[];
  model : AssignmentRule = new AssignmentRuleImpl();

  get diagnostic() { return JSON.stringify(this.model); }

  public fillSalesPersons(){
    var le = this.createForm.get('legalEntity').value;
    var cu = this.createForm.controls['customer'].value;
    this.masterDataService.getSalesPersons(le.reference,cu.reference).subscribe(
      salesPersons => this.salesPersons = salesPersons,
      err => this.errorMessage = err,
      () => console.log("Done getting  : " + JSON.stringify(this.salesPersons))
    );
  }

  private initSalesPerson() {
    return this._fb.group({
      salesperson: [''],
      selectcommission : [''],
      selectSalesVolume : ['']
    });
  }
}
