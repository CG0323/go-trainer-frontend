// angular
import { Injectable } from '@angular/core';

// libs
import { Store, Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
// module
import {CoreService } from '../services/index';
import * as user from '../actions/user.action';

import {getStatus} from '../../ngrx/index'

@Injectable()
export class UserEffects {

  @Effect() move$: Observable<Action> = this.actions$
    .ofType(user.ActionTypes.LOGIN)
    .map(action => {
      return new user.LoginSucceededAction({username:action.payload.username});
    })

  constructor(
    private store: Store<any>,
    private actions$: Actions,
    private coreService: CoreService
  ) { }
}
