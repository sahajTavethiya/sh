import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class Constants {
  OrderReportCategories = {
    RoleMaster: 'RoleMaster',
    StockItemMaster: 'StockItemMaster',
    ClientMaster: 'ClientMaster',
    ManagerMaster: 'ManagerMaster',
    UserMaster : 'UserMaster',
    WorkTypeMaster: 'WorkTypeMaster',
    ProductMaster: 'ProductMaster',
    DesignMaster: 'DesignMaster',
    StatusMaster: 'StatusMaster',
    HSN_Master: 'HSN_Master',
    EmployeeMaster : 'EmployeeMaster',
    MeasurementCategory : 'MeasurementCategory'
  }
  LookupCategories = {
    PreferredTime: 'Preferred Time',
    ServicePriority: 'Service Priority'
  }

  MasterCategories = {
    ServiceMaster: "ServiceMaster",
    ServiceStageMaster: "ServiceStageMaster",
    ZoneMaster: "ZoneMaster",
    ServiceGroup: 'ServiceGroup',
    ServiceForMaster: 'ServiceForMaster',
    Category: 'Category',
    SubCategory: 'SubCategory',
    MaterialMaster: 'MaterialMaster',
    PlanMaster: 'PlanMaster',
    KYCStatusMaster: 'KYCStatusMaster',
    CustomerTitle: 'CustomerTitle',
    OwnershipType: 'OwnershipType',
    PaymentMethod: 'PaymentMethod',
    CustomerNameType: 'CustomerNameType',
    YesNo: 'YesNo',
    LPGConnectionName: 'LPGConnectionName',
    StateMaster: 'StateMaster',
    AllZoneMaster: 'AllZoneMaster',
    CityMaster: 'CityMaster',
    CustomerStatus: 'CustomerStatus',

    RoleMaster: "RoleMaster",
    StockItemMaster: "StockItemMaster",
    ClientMaster: "ClientMaster",
    ProductMaster: "ProductMaster",
    WorkTypeMaster: "WorkTypeMaster",
    ColourMaster: "ColourMaster",
    SizeMaster: "SizeMaster",
    DesignMaster: "DesignMaster",
    StatusMaster: "StatusMaster",
    ActiveMaster: "ActiveMaster",
    HSN_Master : "HSN_Master"
  }

  ServiceStages = {
    Assigned: '2',
    Delay: '3',
    WaitingForApproval: '5',
    InQueue: '6',
    Completed: '21',
    ReviewComplete: '24',
    InProgress: '25',
    Closed: '26',
    Cancle: '27',
    NonWorkable: '4'
  }
  Services = {
    RFC: '6'
  }
}
