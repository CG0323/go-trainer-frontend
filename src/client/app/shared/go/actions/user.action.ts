import { Action } from '@ngrx/store';
import { type } from '../../core/utils/type';
import { USER } from '../common/category.common';
import { KNode,Move } from '../models/index'

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 *
 * The 'type' utility function coerces strings into string
 * literal types and runs a simple check to guarantee all
 * action types in the application are unique.
 */
export interface IUserActions {
  LOGIN: string;
  LOGIN_SUCCEEDED: string
}

export const ActionTypes: IUserActions = {
  LOGIN: type(`${USER} Login`),
  LOGIN_SUCCEEDED: type(`${USER} Login Succeeded`)
};

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */
export class LoginAction implements Action {
  type = ActionTypes.LOGIN;
  constructor(public payload: {username:string, password:string}) { }
}

export class LoginSucceededAction implements Action {
  type = ActionTypes.LOGIN_SUCCEEDED;
  constructor(public payload: {username:string}) { }
}


/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
  = LoginAction
  |LoginSucceededAction
