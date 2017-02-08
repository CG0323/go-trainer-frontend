import { Injector, Component } from '@angular/core';
import { Config } from '../../shared/core/index';
import { Store } from '@ngrx/store';
import { IAppState} from '../../shared/ngrx/index';
import * as user from '../../shared/go/actions/user.action';
@Component({
  moduleId: module.id,
  selector: 'login',
  templateUrl: 'login.component.html',
  styleUrls: [
    'login.component.css',
  ],
})
export class LoginComponent {
  constructor(private store:Store<IAppState>) {

  }

  login(){
    this.store.dispatch(new user.LoginAction({username:"123",password:"123"}));
  }
}
