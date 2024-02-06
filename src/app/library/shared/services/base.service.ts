import { Injectable, Injector } from '@angular/core';
import { ApiProxy } from '../../core/constants/api-proxy';
import { Constants } from '../../core/constants/constants';
import { ApiWrapperService } from './api/api-wrapper.service';
import { NotificationService } from './notification/notification.service';
import * as moment from 'moment';
import { User } from '../../core/models/user/user.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  api: ApiWrapperService;
  notify: NotificationService;
  apiProxy: ApiProxy;
  constants: Constants;
  private authService: AuthService;
  currentUser: User;

  constructor(injector: Injector) {
    this.api = injector.get(ApiWrapperService);
    this.notify = injector.get(NotificationService);
    this.apiProxy = injector.get(ApiProxy);
    this.constants = injector.get(Constants);
    this.authService = injector.get(AuthService);

    this.currentUser = this.authService.currentUserValue;
  }



  Moment(input?: Date | string): moment.Moment {
    if (input) { return moment(input); }
    else { return moment(); }
  }

  getLookups(categories: Array<string>, callback: (lookups: any) => void, serviceId: number | null = null) {
    const lookupModel = {
      userId: this.authService.currentUserValue.id,
      categories: categories,
      serviceId: serviceId
    }

    this.api.post(this.apiProxy.Lookup.getByCategory(), lookupModel).subscribe((response: any) => {
      if (response && response.data && response.data.length > 0) {
        const lookups: any = {};
        categories.forEach(cat => {
          const found = response.data.filter((item: any) => {
            return item.CategoryName === cat;
          });
          if (found) {
            lookups[cat] = found;
          } else {
            lookups[cat] = null;
          }
        });

        callback(lookups);
      } else {
        callback({});
      }
    });
  }
}
