import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class ApiProxy {
    ServiceRequest = {
        initializeSearch: () => {
            return '/SearchServiceRequest/init';
        },
        dashboard: () => {
            return '/SearchServiceRequest/dashboard'
        },
        searchServiceRequest: () => {
            return '/SearchServiceRequest/search';
        },
        getRequest(id: number) {
            return `/ServiceRequest/getEnquiryById/${id}`;
        },
        getMaterials() {
            return `/Master/getMaterials`;
        },
        save() {
            return `/ServiceRequest/save`;
        },
        uploadCustomerSignature() {
            return `/ServiceRequest/UploadCustomerSignature`;
        },
        callRecordingUpload() {
            return `/ServiceRequest/UploadCallRecording`;
        },
        updateStageModifiedBy() {
            return `/ServiceRequest/saveStageModifyBy`;
        },
        changeStatus() {
            return `/ServiceRequest/changeStatus`;
        },
        getSRAvailableManpower() {
            return `/ServiceRequest/getSRAvailableManpower`;
        },
        getCustomer() {
            return `/ServiceRequest/getCustomer`;
        },
        JMR(id: number) {
            return `/servicerequest/downloadDocument?type=JMR&enquiryId=${id}`;
        },
        ServiceDocs(id: number) {
            return `/servicerequest/downloadDocument?type=ServiceDocs&enquiryId=${id}`;
        },
        viewImage(id: number, name: any) {
            return `/servicerequest/downloadDocument?type=Service&enquiryId=${id}&filename=${name}`;
        },
        callPhone(id: number) {
            return `/ServiceRequest/generateEnquiryCall?EnquiryId=${id}`;
        },
        srListUpdate() {
            return `/ServiceRequest/srListUpdate`;
        },
        ChangePassword(OldPassword: any, NewPassword: any) {
            return `/User/changePasword?OldPassword=${OldPassword}&NewPassword=${NewPassword}`;
        },
        CancelRequest(id: any) {
            return `/ServiceRequest/CancelRequest/${id}`;
        },
        BulkGeneratePDF() {
            return `/ServiceRequest/BulkGeneratePDF`;
        },
        GetManpowerForBulkAssigned() {
            return `/ServiceRequest/GetManpowerForBulkAssigned`;
        },
        SaveManpowerForBulkAssigned() {
            return `/ServiceRequest/SaveManpowerForBulkAssigned`;
        },
        getMeterMakeMaster() {
            return `/master/GetMeterMakeMaster`;
        },
        pe_tracker: () => {
            return '/Report/ServiceCompletion';
        },
        GetBillReport: () => {
            return '/Report/Bill';
        },
        HelpdeskSr1: () => {
            return '/Report/HelpdeskSr1';
        },
        GetTATReport: () => {
            return '/Report/TAT';
        },
        ManpowerPerformance: () => {
            return '/Report/ManpowerPerformance';
        },
        GetEmployeeListByZoneId: () => {
            return '/Lookup/GetEmployeeListByZoneId';
        },
        InComplete: () => {
            return '/Report/InComplete';
        },
        callCenter: () => {
            return '/Report/callCenter';
        },
        AttendanceReport: () => {
            return '/Report/Attendance';
        },
        DownloadJMRs: () => {
            return `/ServiceRequest/downloadJMRs`;
        },
        downloadCallRecording(customerID: any, srNumber: any, phoneNo: any, callType: any, callTime: any, fileName: any) {
            return `/servicerequest/downloadCallRecording?customerID=${customerID}&srNumber=${srNumber}&phoneNo=${phoneNo}&callType=${callType}&callTime=${callTime}&fileName=${fileName}`;
        },
        GetUserByRoleId(id: any) {
            return `/User/GetUserByRoleId?RoleId=${id}`;
        },
        GetEmployeeListByZoneIdAndTypeId() {
            return `/Lookup/GetEmployeeListByZoneIdAndTypeId`;
        },
        GetAllEmployees() {
            return `/Report/getAllEmployees`;
        },
        getAllApplicationUser() {
            return `/DailyReport/getAllApplicationUserList`;
        },
        getAllApplicationUserForAttendanceReport() {
            return `/DailyReport/getAllApplicationUserListForAttendanceReport`;
        },
        GetAllMaterial() {
            return `/Inventory/GetAllMaterial`;
        },
        CustomerAcquistionSave() {
            return `/CustomerMaster/save`;
        },
        Customersearch: () => {
            return '/CustomerMaster/search';
        },
        getbyId(id: number) {
            return `/CustomerMaster/getbyId?Id=${id}`;
        },
        customerMasterReject() {
            return `/CustomerMaster/reject`;
        },
        materialReceipt: () => {
            return `/Inventory/getAllMaterialReceipt`;
        },
        materialIssueDetail: (id: Number) => {
            return `/Inventory/getMaterialIssueById/${id}`
        },
        getAllMaterialissue: () => {
            return `/Inventory/getAllMaterialIssue`
        },
        getAllMaterialReceiptForExcelExport: () => {
            return `/Inventory/getAllMaterialReceiptForExcelExport`;
        },
        getAllMaterialIssueForExcelExport: () => {
            return `/Inventory/getAllMaterialIssueForExcelExport`;
        },
        downloadMaterialIssueFile: (data: any) => {
            return `/Inventory/downloadMaterialIssueFile?fileName=${data}`
        },
        downloadMaterialReceiptFile: (data: any) => {
            return `/Inventory/downloadMaterialReceiptFile?fileName=${data}`
        },
        saveMaterialReceipt: () => {
            return `/Inventory/saveMaterialReceipt`
        },
        saveMaterialIssue: () => {
            return `/Inventory/uploadFile`
        },
        CustomerDocuments(requestId: number, name: any) {
            return `/Master/downloadDocument?type=CustomerDocuments&Id=${requestId}&filename=${name}`;
        },
        GetProjectReport: () => {
            return '/Report/Project';
        },
        getConsumptionReport: () => {
            return '/Report/consumption';
        },
        getAllServiceMaster: () => {
            return '/Inventory/getAllMaterialCategory';
        },
        MatrialReciptDetailsById: (id: Number) => {
            return `/Inventory/getmaterialReceiptById/${id}`
        },
        downloadPDF: (id: number) => {
            return `/Inventory/downloadPDF/${id}`
        },
        downloadDPR_Image: (id: any) => {
            return `/Inventory/downloadDPRImage?fileName=${id}`
        },
        downloadPDF_ForMI: (id: number) => {
            return `/Inventory/downloadPDF/MI/${id}`
        },
        getMaterialStockReport: () => {
            return `/Stock/getMaterialStockReport`
        },
        getReconciliationReport: () => {
            return `/Inventory/getContractorReconciliation`
        },
        getDPR_Report: () => {
            return `/DailyReport/getDPR_Report`
        },
        getAllVendor: () => {
            return `/Inventory/getAllVendor`
        },
        updateMRVenodorAndNote: () => {
            return `/Inventory/updateMRVenodorAndNote`
        },
        updateMINotes: () => {
            return `/Inventory/updateMINotes`
        },
        UploadImageOfIsometricGraph: () => {
            return `/ServiceRequest/UploadImageOfIsometricGraph`
        },
        getSubServices: () => {
            return `/DailyReport/getAllSubServicesForDPR`
        },
        GetAllZonesByAppUserId: (id: number) => {
            return `/DailyReport/spGetAllZonesByAppUserId?id=${id}`
        },
        GetAllActiveZone: () => {
            return `/Manpower/GetAllActiveZone`
        },
        getAllActiveZoneCityCountry: () => {
            return `/Manpower/getAllActiveZoneCityCountry`
        },
        getAllAppRole: () => {
            return `/Manpower/getAllAppRole`
        },
        saveEmployee: () => {
            return '/Manpower/saveEmployee'
        },
        UploadFileOfEmployee: () => {
            return `/Manpower/UploadFileOfEmployee`
        },
        UpdateAppUserDocumentPath: () => {
            return `/Manpower/UpdateAppUserDocumentPath`
        }
    };

    Lookup = {
        getByCategory: () => {
            //return '/Lookup/getByCategory';
            return '/common/getByCategory';
        }
    }

    User = {
        authenticate() {
            return '/admin/login';
        },
        forgotPasword(id: number) {
            return `/User/forgotPasword?UserName=${id}`;
        }
    }
    Common = {
        getOrderReport() {
            return `/admin/OrderReport`
        },
        getUserReport() {
            return `/admin/GetUserReport`
        },
        saveOrder() {
            return `/admin/addOrder`
        },
        getOrderDetailById() {
            return `/admin/GetOrderDetailById`
        },
        getOrderListForAdminToAssignManager() {
            return `/admin/getOrderListForAdminToAssignManager`
        },
        getOrderListToAssignEmployee() {
            return `/manager/getOrderListToAssignEmployee`
        },
        getTotalSubmitWorkDetailByOrderId() {
            return `/manager/getTotalSubmitWorkDetailByOrderId`
        },
        getClietReport() {
            return `/admin/GetClientReport`
        },
        saveDailyWork() {
            return `/manager/saveDailyWork`
        },
        getProductionDataFromOrderId() {
            return `/manager/getProductionDataFromOrderId`
        },
    }
    Admin = {
        saveClient() {
            return `/admin/addClient`;
        },
        addUser() {
            return `/admin/addUser`;
        },
        getUserDetailById() {
            return `/admin/GetUserDetailById`;
        },
        getStockReport() {
            return `/admin/getStockReport`;
        },
        addStock() {
            return `/admin/addStock`;
        },
        getAssignListByOrderId() {
            return '/admin/getAssignListByOrderId'
        },
        assignTaskToEmployee(){
            return `/manager/assignTaskToEmployee`
        },
        addProduction(){
            return `/manager/addProduction`
        },
        getSellListForGrid(){
            return `/admin/GetSellListForGrid`
        },
        getCurrentAvailableSellProdcuts(){
            return  `/admin/getCurrentAvailableSellProdcuts`
        }        
    }
}
