import { prop, propArray, propObject } from "@rxweb/reactive-form-validators";
import { EnquiryTaskLine } from "./enquiry-task-line.model";
import { RequestDetail } from "./request-detail.model";
import { EnquiryCallDetailList } from "./enquiry-call-detailList-model";
import { AssignedManpowerList } from "./assigned-manpowerList-model";
import { ManpowerTaskTimeList } from "./manpower-taskTimeList-model";
import { CustomerCorrespondenceList } from "./customer-correspondenceList-model";
import { SparesConsumableList } from "./spares-correspondenceList-model";
import { RequestPermission } from "./request-permission.model";
import { DocumentList } from "./documentList-model";
import {SpareConsumable} from "./sparesConsumable.model";

export class RequestContainer {
    constructor(container?: RequestContainer) {
        this.enquiryTaskLine = new Array<EnquiryTaskLine>();
        this.enquiryCallDetailList = new Array<EnquiryCallDetailList>();
        this.assignedManpowerList = new Array<AssignedManpowerList>();
        this.manpowerTaskTimeList = new Array<ManpowerTaskTimeList>();
        this.customerCorrespondenceList = new Array<CustomerCorrespondenceList>();
        this.sparesConsumableList = new Array<SparesConsumableList>();
        this.documentList = new Array<DocumentList>();

        this.openingTaskTypePermission = new RequestPermission();
        this.spareAndConsumablePermission = new RequestPermission();
        this.actualTaskTypePermission = new RequestPermission();
        this.assignedManpowerPermission = new RequestPermission();
        this.manpowerTaskTimePermission = new RequestPermission();
        
        if (container) {
            this.request = new RequestDetail(container.request);
            if (container.enquiryTaskLine && container.enquiryTaskLine.length > 0) {
                container.enquiryTaskLine.forEach(etl => {
                    etl.rowStatus = 2;
                    this.enquiryTaskLine.push(new EnquiryTaskLine(etl));
                });
            }
            if (container.enquiryCallDetailList && container.enquiryCallDetailList.length > 0) {
                container.enquiryCallDetailList.forEach(etl => {
                    etl.description = container.request.description;
                    this.enquiryCallDetailList.push(new EnquiryCallDetailList(etl));
                });
            }
             if (container.sparesConsumableList && container.sparesConsumableList.length > 0) {
                 container.sparesConsumableList.forEach(etl => {
                     this.sparesConsumableList.push(new SparesConsumableList(etl));
                 });
            }
            if (container.assignedManpowerList && container.assignedManpowerList.length > 0) {
                container.assignedManpowerList.forEach(etl => {
                    etl.mobileNo = container.request.mobileNo;
                    etl.serviceName = container.request.serviceName;
                    etl.rowStatus = 2;
                    this.assignedManpowerList.push(new AssignedManpowerList(etl));
                });
            }
            if (container.manpowerTaskTimeList && container.manpowerTaskTimeList.length > 0) {
                container.manpowerTaskTimeList.forEach(etl => {
                    etl.mobileNo = container.request.mobileNo;
                    etl.rowStatus = 2;
                    this.manpowerTaskTimeList.push(new ManpowerTaskTimeList(etl));
                });
            }
            if (container.customerCorrespondenceList && container.customerCorrespondenceList.length > 0) {
                container.customerCorrespondenceList.forEach(etl => {
                    
                    this.customerCorrespondenceList.push(new CustomerCorrespondenceList(etl));
                });
            }

            if (container.documentList && container.documentList.length > 0) {
                container.documentList.forEach(etl => {
                    
                    this.documentList.push(new DocumentList(etl));
                });
            }
            // if (container.sparesConsumableList && container.sparesConsumableList.length > 0) {
            //     container.sparesConsumableList.forEach(etl => {
            //         etl.rowStatus = 2;
            //         this.sparesConsumableList.push(new SparesConsumableList(etl));
            //     });
            // }
        } else {
            this.request = new RequestDetail();
        }
    }

    @propObject(RequestDetail)
    request: RequestDetail;

    @propArray(EnquiryTaskLine)
    enquiryTaskLine: Array<EnquiryTaskLine>;

     @propArray(SpareConsumable)
     sparesConsumable: Array<SpareConsumable>;

    @propArray(EnquiryCallDetailList)
    enquiryCallDetailList: Array<EnquiryCallDetailList>;

    @propArray(AssignedManpowerList)
    assignedManpowerList: Array<AssignedManpowerList>;

    @propArray(ManpowerTaskTimeList)
    manpowerTaskTimeList: Array<ManpowerTaskTimeList>;

    @propArray(CustomerCorrespondenceList)
    customerCorrespondenceList: Array<CustomerCorrespondenceList>;

    @propArray(DocumentList)
    documentList: Array<DocumentList>;

    @propArray(SparesConsumableList)
    sparesConsumableList: Array<SparesConsumableList>;

    @propObject(RequestPermission)
    openingTaskTypePermission: RequestPermission;

    @propObject(RequestPermission)
    spareAndConsumablePermission: RequestPermission;

    @propObject(RequestPermission)
    actualTaskTypePermission: RequestPermission;

    @propObject(RequestPermission)
    assignedManpowerPermission: RequestPermission;

    @propObject(RequestPermission)
    manpowerTaskTimePermission: RequestPermission;
}