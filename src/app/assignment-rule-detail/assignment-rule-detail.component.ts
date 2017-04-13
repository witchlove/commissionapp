import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {CommissionBackEndService} from '../commission-back-end.service';
import {AssignmentRule} from '../commission-back-end.service'
import {AssignmentRuleImpl} from '../models/assignment-rule-impl'
import {Observable}     from 'rxjs/Observable';
import 'rxjs/Rx';


@Component({
  selector: 'app-assignment-rule-detail',
  templateUrl: './assignment-rule-detail.component.html',
  styleUrls: ['./assignment-rule-detail.component.css']
})
export class AssignmentRuleDetailComponent implements OnInit {
  private errorMessage:string;

  constructor(private route:ActivatedRoute,
              private router:Router, private commissionService:CommissionBackEndService) {

  }

  id:string;
  rule:AssignmentRule;
  refinementRules = [];
  dataLoaded :number  = 0;
  dataRefinementLoaded : number = 0;


  ngOnInit() {
    this.route.params.forEach((params:Params) => {
      this.id = params['id'];
      this.getRule(this.id);
      this.getRefinements(this.id)
    });
  }

  gotoOverview(){
    this.router.navigate(['/']);
  }

  getRefinements(id:string){
    this.commissionService.getRefinementRules(this.id)
      .subscribe(
        refinementRules => { this.refinementRules = refinementRules;},
        err => this.errorMessage = err,
        () => { console.log(this.refinementRules); this.dataRefinementLoaded = 1})

  }

  getRule(id:string) {
    this.commissionService.getRule(id)
      .subscribe(
        assignmentRule => {console.log(assignmentRule); this.rule = assignmentRule;this.dataLoaded = 1;},
        err => this.errorMessage = err,
        () => { console.log("DONE?DONE");})
  }
}
