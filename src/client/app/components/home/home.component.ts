// libs
import { Component, ElementRef, ViewChild,OnInit, OnDestroy, } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { MenuItem, SlideMenuModule,Message } from 'primeng/primeng';
import { IAppState, getTextMarkups,getTrMarkups,getMsgs,getStatus,getStones,getMenuItems,getProblemRaws, getIsFirstProblem, getIsLastProblem,getIsNotInProblem } from '../../shared/ngrx/index';
import * as board from '../../shared/go/actions/board.action';
import * as directory from '../../shared/go/actions/directory.action';
import { ProblemRaw,Markup, BoardStatus,Stone} from '../../shared/go/models/index'



@Component({
  moduleId: module.id,
  selector: 'sd-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy  {
  @ViewChild('directory') directory;
  //control related
  private directorySubscription;
  private isFirst$:Observable<boolean>;
  private isLast$: Observable<boolean>;
  private isNotInProblem$: Observable<boolean>;
  private problems$: Observable<ProblemRaw[]>;
  private menuItems:MenuItem[];

  //board related
  private textMarkups$: Observable<Markup[]>;
  private trMarkups$: Observable<Markup[]>;
  private msgs$ : Observable<Message[]>;
  private boardStatus$: Observable<BoardStatus>;
  private stones$: Observable<Stone[]>;
  private stones: Stone[];

  constructor(private store: Store<IAppState>) {
    this.directorySubscription = store.let(getMenuItems)
         .subscribe((items:any[]) => {
            this.menuItems = items.map(item=>this.appendCommand2MenuItem(item));
           })
    this.problems$ = store.let(getProblemRaws);
    this.isFirst$ = store.let(getIsFirstProblem);
    this.isLast$ = store.let(getIsLastProblem);
    this.isNotInProblem$ = store.let(getIsNotInProblem);

    this.textMarkups$ = store.let(getTextMarkups);
    this.trMarkups$ = store.let(getTrMarkups);
    this.msgs$ = store.let(getMsgs);
    this.boardStatus$ = store.let(getStatus);
    this.stones$ = store.let(getStones);
  }

  ngOnInit():void {
       
  }
    
  ngOnDestroy() {
      this.directorySubscription.unsubscribe();
  }


  appendCommand2MenuItem = (item:any)=>{
      if(item.id){
        item.command = (event) => {
          this.store.dispatch(new directory.SelectDirectoryAction(event.item.id));
          this.directory.hideMenu();
        };
        return item;
      }
      else{
          item.items = item.items.map(i=>this.appendCommand2MenuItem(i));
          return item;
      }
  }
  onSelectDirectory(id:string){
      this.store.dispatch(new directory.SelectDirectoryAction(id));
  }

  onRedoProblem(){
      this.store.dispatch(new directory.ReloadProblemAction());
  }

  onNextProblem(){
      this.store.dispatch(new directory.NextProblemAction());
  }

  onPrevProblem(){
      this.store.dispatch(new directory.PreviousProblemAction());
  }

  onClick(coord:{x:number,y:number}) {
      this.store.dispatch(new board.MoveAction({x:coord.x,y:coord.y,c:1}));
  }

}
