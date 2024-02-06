import { Injectable, Injector } from '@angular/core';
import { BaseService } from 'src/app/library/shared/services/base.service';

@Injectable({
  providedIn: 'root'
})
export class TaskDetailsService extends BaseService {

  constructor(injector: Injector) {
    super(injector);
  }
}
