// app
import { Component, Input, Output, ViewChild, EventEmitter} from '@angular/core';
import { Store } from '@ngrx/store';
import { CoreService} from '../services/index'
import { Message} from 'primeng/primeng'
import { Markup, BoardStatus,Stone} from '../models/index'
@Component({
  moduleId: module.id,
  selector: 'go-board',
  templateUrl: 'board.component.html',
  styleUrls: [
    'board.component.css',
  ],
})

export class BoardComponent {
    @Input() textMarkups:Markup[];
    @Input() trMarkups:Markup[];
    @Input() msgs:Message[];
    @Input() status:BoardStatus;
    @Input() stones:Stone[];
    @Input() turn:number;
    @Output() boardClick = new EventEmitter<any>();
    dim: number = 19;                           
    lines = CoreService.getLines(19);                  
    stars = CoreService.getStars(19);                  
    staticGrid: number[][] = CoreService.createGrid();
    coordinates : string[] = CoreService.getCoordinates();

    constructor() {

    }

    onClick(i:number,j:number) {
      this.boardClick.emit({x:i,y:j,c:this.turn});
    }

    getTrianglePoints(markup: any): string{
      var x0 = markup.x*500;
      var y0 = 500*markup.y +500;
      var x1 = markup.x*500 + 250;
      var y1 = 500*markup.y;
      var x2 = markup.x*500 + 500;
      var y2 = 500*markup.y +500;

      var result = x0 + ',' + y0 + ' ' + x1 + ',' + y1 + ' ' + x2 + ',' + y2;
      return result;
    }

    getGridStatus(i:number,j:number):number {
      var position = i + "," + j;
      if(!this.stones){
        return 0;
      }else{
        var temp = this.stones.filter(s=>s.position === position);
        if(temp.length == 0){
          return 0;
        }else{
          return temp[0].c;
        }
      }
    }

    getStyleClass():string{
      if(this.turn == 1){
        return "empty-black";
      }else{
        return "empty-white";
      }

    }
}
