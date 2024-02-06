import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoaderService } from '../loader/loader.service';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiWrapperService {
  apiUrl: string = environment.apiUrl;
  oldUrl: string = environment.oldUrl;
  constructor(
    readonly loaderService: LoaderService,
    private  http: HttpClient) { }

  get<T>(url: string, showLoader: boolean = true) {
    if (showLoader) {
      this.loaderService.show();
    }
    
    url = this.apiUrl + url;
    
    return this.http.get<T>(url)
      .pipe(
        finalize(() => {
          if (showLoader) {
            this.loaderService.hide();
          }
        })
      );
  }

  get1<T>(url: string, showLoader: boolean = true) {
    if (showLoader) {
      this.loaderService.show();
    }
    
    const httpOptions = {
      responseType: 'blob' as 'json'
    };
    url = this.apiUrl + url;
    return this.http.get<T>(url,httpOptions)
      .pipe(
        finalize(() => {
          if (showLoader) {
            this.loaderService.hide();
          }
        })
      );
  }
  get2<T>(url: string,token:any, showLoader: boolean = true) {
    // if (showLoader) {
    //   this.loaderService.show();
    // }
    console.log("its get api");
    
    
    // const httpOptions1 = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json',
    //     'Authorization':'Bearer '+token
    //   }),
    //   responseType: 'blob' as 'json'
    // }
    
     url = this.apiUrl + url;
    // console.log(url);
    // return this.http.get<T>(url,httpOptions)
    //   .pipe(
    //     finalize(() => {
    //       if (showLoader) {
    //         this.loaderService.hide();
    //       }
    //     })
    //   );
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization':   token
    //  'Authorization': 'Bearer ' + token // Replace token with your authorization token
    });

    // Make the HTTP request with the headers
    return this.http.get(url, { headers });
  }
  post1<T>(url: string, postData: any, showLoader: boolean = true) {
    if (showLoader) {
      this.loaderService.show();
    }

    const httpOptions1 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      responseType: 'blob' as 'json'
    };

    url = this.apiUrl + url;
    postData = JSON.stringify(postData);
    return this.http.post<T>(url, postData, httpOptions1)
      .pipe(
        finalize(() => {
          if (showLoader) {
            this.loaderService.hide();
          }
        })
      );
  }

  post<T>(url: string, postData: any, showLoader: boolean = true) {
    if (showLoader) {
      this.loaderService.show();
    }
    url = this.apiUrl + url;
    console.log(url);
    
    postData = JSON.stringify(postData);
    return this.http.post<T>(url, postData, httpOptions)
      .pipe(
        finalize(() => {
          if (showLoader) {
            this.loaderService.hide();
          }
        })
      );
  }


  makecall<T>(url: string, postData: any, showLoader: boolean = true) {
    if (showLoader) {
      this.loaderService.show();
    }
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': 'TTV4i1UJXC36Pb5V7ohiAatsKDEmuQTS4WMFyPgU',
      'Authorization': '2c4f7dd7-0ef5-4157-9e59-c63450e4ec1f' });
  let options = { headers: headers };
    url = url;
    postData = JSON.stringify(postData);
    return this.http.post<T>(url, postData, options)
      .pipe(
        finalize(() => {
          if (showLoader) {
            this.loaderService.hide();
          }
        })
      );
  }

  logoutNET<T>(url: string, showLoader: boolean = true) {
    if (showLoader) {
      this.loaderService.show();
    }
    url = this.oldUrl + url;
    return this.http.get<T>(url)
      .pipe(
        finalize(() => {
          if (showLoader) {
            this.loaderService.hide();
          }
        })
      );
  }

  put<T>(url: string, putData: any, showLoader: boolean = true) {
    if (showLoader) {
      this.loaderService.show();
    }
    url = this.apiUrl + url;
    return this.http.put(url, putData, httpOptions)
      .pipe(
        finalize(() => {
          if (showLoader) {
            this.loaderService.hide();
          }
        })
      );
  }
}

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};