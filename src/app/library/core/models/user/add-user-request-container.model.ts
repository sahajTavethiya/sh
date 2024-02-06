import { formatDate, Time } from "@angular/common";
import { AppUser } from "./appUser.model";
import { User} from "./user.model"
import { prop, propArray, propObject } from "@rxweb/reactive-form-validators";
import { UserDetail } from "./user-detail.model";
import { ContractorEmployee } from "./contractorEmployee.model";
export class AddUserRequestContainer {
    constructor(container?: AddUserRequestContainer) {
        this.UserDetail = new Array<UserDetail>();

         if (container) {
            this.request = new AppUser(container.request);
            if (container && container.UserDetail.length > 0) {
                container.UserDetail.forEach(etl => {
                   // etl.rowStatus = 2;
                    this.UserDetail.push(new UserDetail(etl));
                });
            }

         }else{
            this.request = new AppUser();
            this.ContractorEmployee = new ContractorEmployee();
         }
}
@propObject(AppUser)
request: AppUser;

@propArray(UserDetail)
UserDetail: Array<UserDetail>;

@propObject(ContractorEmployee)
ContractorEmployee: ContractorEmployee;
}
