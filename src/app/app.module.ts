import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';

import { routing, appRoutingProviders }  from './app.routing';

import { AppComponent } from './app.component';
import { AssignmentRuleFormComponent } from './assignment-rule-form/assignment-rule-form.component';
import { AssignmentRulesOverviewComponent } from './assignment-rules-overview/assignment-rules-overview.component';
import { CommissionBackEndService } from './commission-back-end.service';
import { PageNotFoundComponentComponent } from './page-not-found-component/page-not-found-component.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AssignmentRuleDetailComponent } from './assignment-rule-detail/assignment-rule-detail.component';
import { SearchComponent } from './search/search.component';
import { SearchassignmentComponent } from './searchassignment/searchassignment.component'
import { MasterDataService } from "./master-data.service";
import { SalesPersonComponent } from './sales-person/sales-person.component';
import { RefinementRuleFormComponent } from './refinement-rule-form/refinement-rule-form.component';
import { RefinementPeriodComponent } from './refinement-period/refinement-period.component';
import { EditAssignmentComponent } from './edit-assignment/edit-assignment.component';


@NgModule({
  declarations: [
    AppComponent,
    AssignmentRuleFormComponent,
    AssignmentRulesOverviewComponent,
    PageNotFoundComponentComponent,
    HomePageComponent,
    AssignmentRuleDetailComponent,
    SearchComponent,
    SearchassignmentComponent,
    SalesPersonComponent,
    RefinementRuleFormComponent,
    RefinementPeriodComponent,
    EditAssignmentComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    routing
  ],
  providers: [MasterDataService,CommissionBackEndService,appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
