import { Observable } from 'rxjs/Observable';
import { LoginStatus} from '../models/index';



export interface IUserState {
  loginStatus: LoginStatus;
}

export const initialUserState: IUserState = {
  loginStatus: LoginStatus.LoggedOut
};

export function getLoginStatus(state$: Observable<IUserState>) {
  return state$.select(state => state.loginStatus);
} 





