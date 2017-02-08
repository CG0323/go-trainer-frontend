import { IUserState, initialUserState } from '../states/user.state';
import * as actions from '../actions/user.action';
import {} from '../models/index';

export function userReducer(
    state: IUserState = initialUserState,
    action: actions.Actions
): IUserState {
  switch (action.type) {
    case actions.ActionTypes.LOGIN_SUCCEEDED:{
      return (<any>Object).assign({}, state, {
        isLoggedIn:true});
    }
      
    default:
      return state;
  }
}
