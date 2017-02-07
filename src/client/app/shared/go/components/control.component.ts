import { Component, Input, Output, ViewChild, EventEmitter} from '@angular/core';
import { MenuItem} from 'primeng/primeng';
import { ProblemRaw } from '../models/index'


@Component({
  moduleId: module.id,
  selector: 'go-control',
  templateUrl: 'control.component.html',
  styleUrls: [
    'control.component.css',
  ],
})

export class ControlComponent {
      @Input() isFirst:boolean;
      @Input() isLast:boolean;
      @Input() isNotInProblem:boolean;
      @Input() problems: ProblemRaw[];
      @Output() redoProblem = new EventEmitter<any>();
      @Output() nextProblem = new EventEmitter<any>();
      @Output() prevProblem = new EventEmitter<any>();
      constructor() {
    }

    onRedoProblem(){
      this.redoProblem.emit();
    }

    onNextProblem(){
      this.nextProblem.emit();
    }

    onPrevProblem(){
      this.prevProblem.emit();
    }

    getPrevLable(){
      if(this.isInMobile()){
        return " ";
      }else{
        return "上一道题";
      }
    }
    getRedoLable(){
      if(this.isInMobile()){
        return " ";
      }else{
        return "重做本题";
      }
    }
    getNextLable(){
      if(this.isInMobile()){
        return " ";
      }else{
        return "下一道题";
      }
    }

    isInMobile(){
        let innerWidth = window.screen.width;
        if(innerWidth <= 800){
            return true;
        }else{
            return false;
        }
    }

}


