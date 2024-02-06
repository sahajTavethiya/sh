import { A } from "@angular/cdk/keycodes";

export class User {
    constructor(user?: User) {
        if (user) {
            this.id = user.id;
            this.firstName = user.firstName;
          //  this.lastName = user.lastName;
            this.roleID = user.roleID;
            this.emailId = user.emailId;
            this.username = user.username;
            // this.isActive = user.isActive;
            // this.createdOn = user.createdOn;
            // this.cityId = user.cityId;
            // this.mobile = user.mobile;
            // this.manpowerId = user.manpowerId;
            // this.provider = user.provider;
            // this.providerId = user.providerId;
            // this.companyMasterId = user.companyMasterId;
            // this.createdBy = user.createdBy;
            // this.userTypeId = user.userTypeId;
            this.token = user.token;
        }
    }

    id: number;
    firstName: string;
  //  lastName: string;
    roleID: number;
    emailId: string;
    username: string;
   // isActive: string;
   // createdOn: Date;
   // cityId: string;
   // mobile: string;
   // manpowerId: number;
   // provider: string;
   // providerId: string;
   // companyMasterId: number;
   // createdBy: number;
   // userTypeId: number;
    token: string;
}