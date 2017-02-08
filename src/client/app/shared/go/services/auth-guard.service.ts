import {CanActivate, Router, ActivatedRouteSnapshot} from "@angular/router";
import {Injectable,OnInit, OnDestroy} from "@angular/core";
import { Store} from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { IAppState, getIsLoggedIn} from '../../ngrx/index';
@Injectable()
export class AuthGuard implements CanActivate, OnInit, OnDestroy{
  private isLoggedIn:boolean;
  private subscription;
  constructor(private store: Store<IAppState>, private router: Router){
    this.subscription = store.let(getIsLoggedIn).subscribe((loggedIn:boolean)=>{
      this.isLoggedIn = loggedIn;
      if(this.isLoggedIn){
        this.router.navigate(['']);
      }
    })
  }

  ngOnInit():void {

  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  canActivate(){
      if(this.isLoggedIn){
        return true;
      }else{
        this.router.navigate(['login']);
        return false;
      }
      
  }
}
