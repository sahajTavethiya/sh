import { Validators } from "@angular/forms";
import { prop,rule,RxwebValidators } from "@rxweb/reactive-form-validators";

// export class ConsumptionReportModel {
//     constructor() {
//     }
 


    
    
//     materialCategoryID: number;
    
//     @prop()
//     fromDate: Date;
//     @prop()
//     toDate: Date;
//     @prop()
//     storeId: Date;
//     @prop()
//     contractorId: Date;
//     @prop()
//     zones: Date;
    

// }

export class ConsumptionReportModel {

  
 //   @rule({customRules:[customValidator] })
 @prop()
    materialCategoryID:number;
    @prop()
    fromDate: Date;
    @prop()
    toDate: Date;
    @prop()
    storeId: Date;
    @prop()
    contractorId: Date;
    @prop()
    zones: Date;
    @prop()
    employeeName:number;
  }
  
  
  export function customValidator(entityObject:ConsumptionReportModel): {[key:string]:any} {
     if(entityObject.materialCategoryID == null){
       return {valid: 0};
     }
     return {valid : 1};
   }