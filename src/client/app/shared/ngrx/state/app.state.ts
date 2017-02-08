// libs
import { Observable } from 'rxjs/Observable';
// import { combineLatest } from 'rxjs/observable/combineLatest';
import { ActionReducer } from '@ngrx/store';
import '@ngrx/core/add/operator/select';

/**
 * The compose function is one of our most handy tools. In basic terms, you give
 * it any number of functions and it returns a function. This new function
 * takes a value and chains it through every composed function, returning
 * the output.
 *
 * More: https://drboolean.gitbooks.io/mostly-adequate-guide/content/ch5.html
 */
import { compose } from '@ngrx/core/compose';

/**
 * storeFreeze prevents state from being mutated. When mutation occurs, an
 * exception will be thrown. This is useful during development mode to
 * ensure that none of the reducers accidentally mutates the state.
 */
import { storeFreeze } from 'ngrx-store-freeze';

/**
 * combineReducers is another useful metareducer that takes a map of reducer
 * functions and creates a new reducer that stores the gathers the values
 * of each reducer and stores them using the reducer's key. Think of it
 * almost like a database, where every reducer is a table in the db.
 *
 * More: https://egghead.io/lessons/javascript-redux-implementing-combinereducers-from-scratch
 */
import { combineReducers } from '@ngrx/store';

/**
 * Every reducer module's default export is the reducer function itself. In
 * addition, each module should export a type or interface that describes
 * the state of the reducer plus any selector functions. The `* as`
 * notation packages up all of the exports into a single object.
 */

import * as fromGo from '../../go/index';
import { IDirectoryState, IBoardState, IUserState } from '../../go/index';

/**
 * As mentioned, we treat each reducer like a table in a database. This means
 * our top level state interface is just a map of keys to inner state types.
 */
export interface IAppState {
  directory: fromGo.IDirectoryState;
  board: fromGo.IBoardState;
  user: fromGo.IUserState;
};

/**
 * Because metareducers take a reducer function and return a new reducer,
 * we can use our compose helper to chain them together. Here we are
 * using combineReducers to make our top level reducer, and then
 * wrapping that in storeLogger. Remember that compose applies
 * the result from right to left.
 */
const reducers = {
  directory: fromGo.directoryReducer,
  board: fromGo.boardReducer,
  user: fromGo.userReducer
};

const developmentReducer: ActionReducer<IAppState> = compose(storeFreeze, combineReducers)(reducers);
const productionReducer: ActionReducer<IAppState> = combineReducers(reducers);

export function AppReducer(state: any, action: any) {
  if (String('<%= BUILD_TYPE %>') === 'dev') {
    return developmentReducer(state, action);
  } else {
    return productionReducer(state, action);
  }
}

export function getDirectoryState(state$: Observable<IAppState>): Observable<IDirectoryState> {
  return state$.select(s => s.directory);
}
export function getBoardState(state$: Observable<IAppState>): Observable<IBoardState> {
  return state$.select(s => s.board);
}
export function getUserState(state$: Observable<IAppState>): Observable<IUserState> {
  return state$.select(s => s.user);
}

export const getMenuItems: any = compose(fromGo.getMenuItems, getDirectoryState);
export const getProblemRaws: any = compose(fromGo.getProblemRaws, getDirectoryState);
export const getCurrentProblemRaw: any = compose(fromGo.getCurrentProblemRaw, getDirectoryState);
export const getTextMarkups: any = compose(fromGo.getTextMarkups, getBoardState);
export const getTrMarkups: any = compose(fromGo.getTrMarkups, getBoardState);
export const getMsgs: any = compose(fromGo.getMsgs, getBoardState);
export const getStatus: any = compose(fromGo.getStatus, getBoardState);
export const getStones: any = compose(fromGo.getStones, getBoardState);
export const getIsFirstProblem: any = compose(fromGo.getIsFirstProblem, getDirectoryState);
export const getIsLastProblem: any = compose(fromGo.getIsLastProblem, getDirectoryState);
export const getIsNotInProblem: any = compose(fromGo.getIsNotInProblem, getDirectoryState);
export const getIsLoggedIn:any = compose(fromGo.getIsLoggedIn, getUserState);
