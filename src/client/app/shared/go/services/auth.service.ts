// angular
import { Injectable} from '@angular/core';
import {CanActivate, Router, ActivatedRouteSnapshot} from "@angular/router";
import { Http,Response } from '@angular/http';

// libs
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

// app
import { Config } from '../../core/index';
import { Analytics, AnalyticsService } from '../../analytics/index';
import { USER } from '../common/category.common';
import {CookieService} from 'angular2-cookie/core';
import {AppConfig} from './app-config';
import { LoginStatus} from '../models/index';

@Injectable()
export class AuthService extends Analytics {

  constructor(
    public analytics: AnalyticsService,
    private cookieService: CookieService,
    private http: Http,
    private router: Router
  ) {
    super(analytics);
    this.category = USER;
  }

  authenticate(username:string, password:string):Observable<boolean> {
    return this.http.post(AppConfig.LOGIN_BASE + 'users/login', {username:username, password:password})
    .map(res=> true)
    .catch(()=> Observable.of(false));
      // .subscribe(res=>{
      //   if(res.ok){
      //     var date = new Date ();
      //     date.setMinutes (date.getMinutes () + 1);
      //     this.cookieService.put("isLoggedIn", "true", {expires: date});
      //     return LoginStatus.LoggedIn;
      //   }else{
      //     return LoginStatus.LoggingFailed;
      //   }
      // })

    // if(username == "123" && password == "123"){
    //   var date = new Date ();
    //   date.setMinutes (date.getMinutes () + 1);
    //   this.cookieService.put("isLoggedIn", "true", {expires: date});
    //   return LoginStatus.LoggedIn;
    // }else{
    //   return LoginStatus.LoggingFailed;
    // }


  }

  // isAuthenticated():boolean{
  //   if(this.cookieService.get("isLoggedIn") == "true"){
  //     return true;
  //   }
  //   else{
  //     return false;
  //   }
  // }

}
