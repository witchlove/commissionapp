import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions, URLSearchParams} from '@angular/http';
import {Observable}     from 'rxjs/Observable';
import 'rxjs/Rx';
import {SearchCriteria} from "./models/search-criteria";
import {RuleDTOimpl} from './models/create-rule-dto';

export interface CreatorPerson {
  reference: string;
  firstName: string;
  familyName: string;
}

export class CreatorPerson implements CreatorPerson{
  reference:string;
  firstName:string;
  familyName:string;

}

export interface RavagoEntity {
  reference: string;
  callSign: string;
}

export interface Customer {
  reference: string;
  callSign: string;
}

export interface Period {
  startDate: string;
  endDate: string;
}

export interface SalesPerson {
  reference: string;
  firstName: string;
  familyName: string;
}

export interface Assignee {
  salesVolumePercentage: string;
  commissionPercentage: string;
  salesPerson: SalesPerson;
}

export class AssigneeImpl implements Assignee {
  salesVolumePercentage:string;
  commissionPercentage:string;
  salesPerson:SalesPerson;

    constructor(salesVolumePercentage:string, commissionPercentage:string, salesPerson:SalesPerson) {
      this.salesVolumePercentage = salesVolumePercentage;
      this.commissionPercentage = commissionPercentage;
      this.salesPerson = salesPerson;
    }
}

export interface AssignmentValue {
  period: Period;
  assignees: Assignee[];
}

export interface AssignmentRule {
  ravagoEntity: RavagoEntity;
  customer: Customer;
  assignmentValues: AssignmentValue[];
  defaultAssignmentRuleID: string;
}

export interface AssignmentAssignee {
  assigneeID: string;
  salesVolumePercentage: string;
  commissionPercentage: string;
  salesPerson: SalesPerson;
}

export class AssignmentAssigneeImpl implements AssignmentAssignee{
  assigneeID:string;
  salesVolumePercentage:string;
  commissionPercentage:string;
  salesPerson:SalesPerson;

}

export interface Assignment {
  assignmentID: string;
  assignmentRuleID: string;
  salesOrderID: string;
  salesOrderLineNr: string;
  assignmentAssignees: AssignmentAssignee[];
}

export class AssignmentImpl implements Assignment{
  assignmentID:string;
  assignmentRuleID:string;
  salesOrderID:string;
  salesOrderLineNr:string;
  assignmentAssignees:AssignmentAssignee[];

}

  export interface Country {
    identificationCode: string;
  }

  export interface DestinationAddress {
    reference: string;
    addressLine: string;
    addressLine2: string;
    addressName: string;
    cityName: string;
    country: Country;
    countrySubEntityCode: string;
    postalZone: string;
  }

  export class DestinationAddressImpl implements DestinationAddress{
    reference:string;
    addressLine:string;
    addressLine2:string;
    addressName:string;
    cityName:string;
    country:Country;
    countrySubEntityCode:string;
    postalZone:string;

  }

  export interface ProductType {
    reference: string;
    description: string;
  }

  export interface ProductFamily {
    reference: string;
    description: string;
  }

  export interface ProductGroup {
    reference: string;
    description: string;
  }

  export interface ProductSubgroup {
    reference: string;
    description: string;
  }

  export interface ProductProducer {
    reference: string;
    description: string;
  }

  export interface ProductBrand {
    reference: string;
    description: string;
  }

  export interface ProductSpecification {
    productType: ProductType;
    productFamily: ProductFamily;
    productGroup: ProductGroup;
    productSubgroup: ProductSubgroup;
    productProducer: ProductProducer;
    productBrand: ProductBrand;
    productID: string;
  }

  export class ProductSpecificationImpl implements ProductSpecification {
    productType:ProductType;
    productFamily:ProductFamily;
    productGroup:ProductGroup;
    productSubgroup:ProductSubgroup;
    productProducer:ProductProducer;
    productBrand:ProductBrand;
    productID:string;

  }

  export interface RefinementRuleDTO {
    creatorPerson: CreatorPerson;
    defaultAssignmentRuleID: string;
    destinationAddress: DestinationAddress;
    productSpecification: ProductSpecification;
    assignmentValues: AssignmentValue[];
  }

export interface EditAssignmentDTO {
  comment: string;
  assignmentAssignees: AssignmentAssignee[];
}

export class EditAssignmentDTOImpl implements  EditAssignmentDTO{
  comment:string;
  assignmentAssignees:AssignmentAssignee[];

}

@Injectable()
export class CommissionBackEndService {

  urlPublic : string ="http://localhost:1337/10.3.11.2:20003/public/sales/commission/rules";
  urlAssignments:string = 'http://localhost:1337/10.3.11.2:20003/public/sales/commission/assignments';
  urlRelink:string = 'http://localhost:1337/10.3.11.2:20003/public/sales/commission/assignments/relink';

  headers = new Headers({     'Content-Type': 'application/json',
                              'X-ravago-version':'1.0',
                              'X-ravago-userId':'RAV02102',
                              'X-ravago-clientId':'Commission',
                              'X-ravago-authenticationToken':'eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCIsIng1dCI6IkpyMU0zOC15cDV3aGZrdTBEVEMyS1NJYTFtYyIsImtpZCI6Im9yYWtleSJ9.eyJ1aWQiOiJSQVYwMjEwMiIsIm1haWwiOiJiZXJ0Lmh1eWdlbnNAcmF2YWdvLmNvbS5kY2siLCJzdWIiOiJSQVYwMjEwMiIsInJhdmFnb3NlY3VyaXR5Z3JvdXBzIjoiQ29tbWlzc2lvbiBBY2NvdW50YW50LEJMVUUgQ1NSIiwib3JhY2xlLm9hdXRoLnVzZXJfb3JpZ2luX2lkX3R5cGUiOiJMREFQX1VJRCIsIm9yYWNsZS5vYXV0aC51c2VyX29yaWdpbl9pZCI6IlJBVjAyMTAyIiwiaXNzIjoid3d3Lm9yYWNsZS5leGFtcGxlLmNvbSIsImxhc3RuYW1lIjoiSHV5Z2VucyIsInJhdmFnb29obXVpZCI6ImJlcnRoIiwiZmlyc3RuYW1lIjoiQmVydCIsIm9yYWNsZS5vYXV0aC5zdmNfcF9uIjoiUmF2YWdvU2VydmljZVByb2ZpbGUiLCJpYXQiOjE0OTE4MzMzNDAsIm9yYWNsZS5vYXV0aC5wcm4uaWRfdHlwZSI6IkxEQVBfVUlEIiwib3JhY2xlLm9hdXRoLnRrX2NvbnRleHQiOiJyZXNvdXJjZV9hY2Nlc3NfdGsiLCJleHAiOjE0OTk2MzMzNDAsInBybiI6IlJBVjAyMTAyIiwianRpIjoiOTg1NjU4YTMtOWZlNi00MGZmLWFmYjAtZGQ2NThkZDliODJiIiwib3JhY2xlLm9hdXRoLnNjb3BlIjoiQ29tbWlzc2lvbi5JbmZvIEJsdWUuQXBwIE9obS5BcHAgT2htLkluZm8gQmx1ZS5JbmZvIENvbW1pc3Npb24uQXBwIFJhdmFnb1VzZXJQcm9maWxlLm1lIiwib3JhY2xlLm9hdXRoLmNsaWVudF9vcmlnaW5faWQiOiJjb21taXNzaW9uQnJvd3NlckNsaWVudCIsIm9yYWNsZS5vYXV0aC5pZF9kX2lkIjoiNmQyNTg2MWUtYzliOS00MGFlLWE3ZjEtMmE4NTFlOTM5NmVlIiwidXNlci50ZW5hbnQubmFtZSI6IlJhdmFnbyJ9.SLzm4WHLh3nrbK8Hu6ttj79et6WuAEaQqNAuYkS_qhTdFaKlQbRr60r98NkQ9HwOXfRlc7rtGd4gHjQu1wkHzwCyj6kwELp2tv-JDzFkSj-Q56Kmhsk_NvtVoFLClybOdPgahZBC7QTjgXG-MvNJDacPlVmvftAT6DJoPmDbTCs',
                              'X-ravago-messageId':'f81d4fae-7dec-11d0-a765-00a0c91e6bf6',
                              'X-ravago-apiKey':'d856b282-cf8b-43be-8bac-4c29a6f4caf4'

  });
  options = new RequestOptions();

  constructor(private http:Http) {
  }

  getRules():Observable<AssignmentRule[]> {
    this.options.headers = this.headers;
    return this.http.get(this.urlPublic,this.options)
      .map(res => res.json())
      .catch(this.handleError);
  }

  createDefaultRule(rule : RuleDTOimpl): Observable<Response>{
    this.options.headers = this.headers;
    let body = JSON.stringify(rule);
    return this.http.post(this.urlPublic,body,this.options)
      .map(res => { console.log("CREATE RULE DEFAULT RESPONSE : " + res); })
      .catch(this.handleError);
  }

  createRefinementRule(refinementRule : RefinementRuleDTO):Observable<Response>{
    this.options.headers = this.headers;
    let body = JSON.stringify(refinementRule);
    let urlToCreate :string = this.urlPublic + "/" + refinementRule.defaultAssignmentRuleID + "/refinements";
    return this.http.post(urlToCreate,body,this.options)
      .catch(this.handleError);
  }


  searchRules(criteria:SearchCriteria):Observable<AssignmentRule[]> {
    console.log(this.headers);
    this.options.headers = this.headers;
    this.options.search = this.createParams(criteria);
    return this.http.get(this.urlPublic,this.options)
      .map(res => res.json())
      .catch(this.handleError);
  }

  searchAssignment(orderNumber:string,orderlineNumber:string):Observable<Assignment[]>{
    console.log(this.headers)
    this.options.headers = this.headers
    this.options.search = this.createAssignmentParams(orderNumber,orderlineNumber);
    return this.http.get(this.urlAssignments,this.options)
      .map(res => res.json())
      .catch(this.handleError);
  }

  editAssignment(id: string,assignmentDto : EditAssignmentDTO):Observable<Response>{
    this.options.headers = this.headers;
    let body = JSON.stringify(assignmentDto);
    let urlToEdit :string = this.urlAssignments + "/" + id;
    return this.http.put(urlToEdit,body,this.options)
      .catch(this.handleError);
  }

  relink(orderNumber:string,orderlineNumber:string):Observable<Response>{
    this.options.headers = this.headers;
    this.options.search = this.createAssignmentParams(orderNumber,orderlineNumber);
    return this.http.post(this.urlRelink,'',this.options)
      .catch(this.handleError);
  }

  private createAssignmentParams(orderNumber:string,orderlineNumber:string):URLSearchParams{
    let params = new URLSearchParams();
    params.set("salesOrderID",orderNumber);
    if(orderlineNumber != "") {
      params.set("salesOrderLineNr", orderlineNumber);
    }
    console.log("assignmentParams" + params);
    return params;
  }

 private createParams(criteria : SearchCriteria):URLSearchParams{
   let params = new URLSearchParams();

   for (var le of criteria.legalEntity) {
     params.append('ravagoEntityID',le.reference);
   }

   for (var cust of criteria.customer){
     params.append('customerID',cust.reference);
   }

   for (var sp of criteria.salesperson){
     params.append('salesPersonID',sp.reference);
   }

   if(criteria.targetDate != ""){
     params.set('targetDate',criteria.targetDate);
   }
   return params;
  }

  getRefinementRules(id:string) {
    this.options.headers = this.headers
    const response = this.http.get(this.urlPublic+"/" + id + "/refinements",this.options)
      .map(res => res.json())
      .catch(this.handleError);
    return response;
  }

  getRule(id:string):Observable<AssignmentRule> {
    this.options.headers = this.headers
    const response = this.http.get(this.urlPublic+"/" + id,this.options)
      .map(res => res.json())
      .catch(this.handleError);
    return response;
  }

  private extractData(res:Response) {
    let body = res.json();
    console.log("body" + body +" $$$");
    return body;
  }

  private handleError(error:any) {
    let errorParsed = JSON.parse(error._body);
    let errMsg = (errorParsed.message) ? errorParsed.message : errorParsed.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error("error " + errorParsed.message); // log to console instead
    return Observable.throw(errorParsed.message);
  }

}
