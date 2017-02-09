import { IUserState, initialUserState } from '../states/user.state';
import * as actions from '../actions/user.action';
import {LoginStatus} from '../models/index';

export function userReducer(
    state: IUserState = initialUserState,
    action: actions.Actions
): IUserState {
  switch (action.type) {
    case actions.ActionTypes.INITIALIZED:{
      let data = <{loginStatus:LoginStatus}>(action.payload);
      return (<any>Object).assign({}, state, {
        loginStatus:data.loginStatus});
    }
    case actions.ActionTypes.LOGIN_RESULT:{
      let data = <{loginStatus:LoginStatus}>(action.payload);
      return (<any>Object).assign({}, state, {
        loginStatus:data.loginStatus});
    }
      
    default:
      return state;
  }
}
