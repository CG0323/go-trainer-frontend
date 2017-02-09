import {CanActivate, Router, ActivatedRouteSnapshot} from "@angular/router";
import {Injectable,OnInit, OnDestroy} from "@angular/core";
import { Store} from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { IAppState, getLoginStatus} from '../../ngrx/index';
import { LoginStatus} from '../models/index';
@Injectable()
export class AuthGuard implements CanActivate, OnInit, OnDestroy{
  private loginStatus: LoginStatus;
  private subscription;
  constructor(private store: Store<IAppState>, private router: Router){
    this.subscription = store.let(getLoginStatus).subscribe(status=>{
      this.loginStatus = <LoginStatus>status;
    })
  }

  ngOnInit():void {

  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  canActivate(){
      if(this.loginStatus === 1){
        return true;
      }else{
        this.router.navigate(['login']);
        return false;
      }
      
  }
}
