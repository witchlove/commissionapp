import { Component, OnInit } from '@angular/core';
import { SearchCriteria } from '../models/search-criteria';
import {AssignmentRule, CommissionBackEndService} from "../commission-back-end.service";
import {RavagoEntityImpl} from "../models/ravago-entity-impl";
import {CustomerImpl} from "../models/customer-impl";
import {SalesPersonImpl} from "../models/sales-person-impl";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private commissionService: CommissionBackEndService) { }

  currentLegalEntity:RavagoEntityImpl = null;
  currentCustomer:CustomerImpl = null;
  currentSalesperson :SalesPersonImpl = null;
  currentTargetDate : string ="";
  errorMessage : string;

  entities : RavagoEntityImpl[] = [new RavagoEntityImpl("597612","MUEHLSTEIN CA"),new RavagoEntityImpl("515785","CPA")];
  customers : CustomerImpl[] = [
    new CustomerImpl("587505","CHANNEL PRIME ALLIANCE CANADA"),
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

  salespersons : SalesPersonImpl[] = [
    new SalesPersonImpl("113070","JACOB","PERETZ"),
    new SalesPersonImpl("113078","GARY","GODDARD"),
    new SalesPersonImpl("41121","Michael","Kane"),
    new SalesPersonImpl("113047","Robert","O'Donnell"),
    new SalesPersonImpl("111095","George","Winter"),
    new SalesPersonImpl("113036","Dag","Lian"),
    new SalesPersonImpl("113037","John","Ward"),
    new SalesPersonImpl("113038","KELLY","PELOSI"),
    new SalesPersonImpl("113042","DAVID","HESS"),
    new SalesPersonImpl("113039","Tom","Glasrud"),
    new SalesPersonImpl("113082","DANIEL","PERETZ"),
    new SalesPersonImpl("113040","Stuart","Portman")] ;

  model = new SearchCriteria();
  results : AssignmentRule[] = [];

  ngOnInit() {
  }

  addLegalEntity(){
    if(this.currentLegalEntity.reference != "") {
      console.log("adding" + this.currentLegalEntity.reference);
      this.model.legalEntity.push(this.currentLegalEntity);
      console.log(this.model.legalEntity);
      this.currentLegalEntity = null;
    }
  }

  addCustomer(){
    if(this.currentCustomer.reference != "") {
      this.model.customer.push(this.currentCustomer);
      this.currentCustomer = null;
    }
  }

  addSalesPerson(){
    if(this.currentSalesperson.reference != "") {
      this.model.salesperson.push(this.currentSalesperson);
      this.currentSalesperson = null;
    }
  }

  addTargetDate(){
    if(this.currentTargetDate != ""){
      this.model.targetDate = this.currentTargetDate;
      this.currentTargetDate = "";
    }
  }

  clearAll(){
    this.model = new SearchCriteria();
    this.results = [];
  }

  search(){
    console.log("searching");
    this.commissionService.searchRules(this.model).subscribe(
      rules => this.results = rules,
      err => this.errorMessage = err,
      () => console.log("DONE")
    )
  }
}
