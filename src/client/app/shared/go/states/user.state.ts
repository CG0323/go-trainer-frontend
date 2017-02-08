import { Observable } from 'rxjs/Observable';
import { } from '../models/index';



export interface IUserState {
  isLoggedIn: boolean;
}

export const initialUserState: IUserState = {
  isLoggedIn: false
};

export function getIsLoggedIn(state$: Observable<IUserState>) {
  return state$.select(state => state.isLoggedIn);
} 





