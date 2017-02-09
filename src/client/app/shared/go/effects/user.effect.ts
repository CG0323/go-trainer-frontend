// angular
import { Injectable } from '@angular/core';

// libs
import { Store, Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
// module
import {AuthService } from '../services/index';
import * as user from '../actions/user.action';

import {getStatus} from '../../ngrx/index'
import {CookieService} from 'angular2-cookie/core';
import {LoginStatus} from '../models/index';
import {Router} from "@angular/router";
@Injectable()
export class UserEffects {

  @Effect() init$: Observable<Action> = this.actions$
    .ofType(user.ActionTypes.INIT)
    .startWith(new user.InitAction)
    .map(action => {    
      let loggedIn = this.cookieService.get("isLoggedIn");
      
      let status = LoginStatus.LoggedOut;
      if(loggedIn == "true"){
        status = LoginStatus.LoggedIn;
      }
      return new user.InitilizedAction({loginStatus:status});
    })

  @Effect() login$: Observable<Action> = this.actions$
    .ofType(user.ActionTypes.LOGIN)
    .switchMap(action=> this.authService.authenticate(action.payload.username,action.payload.password))
    .map(succeed => {
      if(succeed){
              var date = new Date ();
              date.setMinutes (date.getMinutes () + 1);
              this.cookieService.put("isLoggedIn", "true", {expires: date});
              return new user.LoginResultAction({loginStatus:LoginStatus.LoggedIn});
            }else{
              return new user.LoginResultAction({loginStatus:LoginStatus.LoggingFailed});
            }
    })
    .catch(() => Observable.of(new user.LoginResultAction({loginStatus:LoginStatus.LoggingFailed})));
  
  @Effect() loginResult$: Observable<Action> = this.actions$
    .ofType(user.ActionTypes.LOGIN_RESULT)
    .map(action => {
      let status = action.payload.loginStatus;
      if(status == LoginStatus.LoggedIn){
        this.router.navigate(['']);
      }
      return new user.LoginIdleAction();
    })

  constructor(
    private store: Store<any>,
    private actions$: Actions,
    private cookieService: CookieService,
    private authService: AuthService,
    private router: Router
  ) { }
}
