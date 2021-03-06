import { IBoardState, initialBoardState } from '../states/board.state';
import * as actions from '../actions/board.action';
import {CoreService} from '../services/index'
import { Message} from 'primeng/primeng';
import { Markup, BoardStatus, Move, KNode, Stone} from '../models/index';

export function boardReducer(
    state: IBoardState = initialBoardState,
    action: actions.Actions
): IBoardState {
  switch (action.type) {
    case actions.ActionTypes.INIT:{
      let root = <KNode>action.payload;
      let setup = root.setup;
      let stones:Stone[] = [];
      if(setup){
        for(var i = 0; i < setup.length; i++){
          var move = setup[i];
          stones.push({position: move.x + ","+move.y, c: move.c});
        }
      }
      var msgs:Message[] = [];
      if(root.comment){
        msgs.push({severity:'info', summary:'', detail: root.comment});
      }else{
        msgs.push({severity:'info', summary:'', detail: ''});
      }
      var textMarkups:Markup[] = [];
      var trMarkups:Markup[] = [];
      if(root.markup){
        textMarkups = root.markup.filter(m=>m.type == "LB");
        trMarkups =  root.markup.filter(m=>m.type == "TR");
      }
      var status = BoardStatus.Enabled;
      return (<any>Object).assign({}, state, {
        stones: stones, msgs:msgs, textMarkups: textMarkups, trMarkups: trMarkups, status:status, currentNode:root
      });
    }

    case actions.ActionTypes.MOVE:{
      var move = <Move>action.payload;
      var stones:Stone[] = JSON.parse(JSON.stringify(state.stones))
      stones.push({position: move.x + ","+move.y, c: move.c});
      var nextNode = state.currentNode.children.find(n=>n.move.x === move.x && n.move.y === move.y);
      var status:BoardStatus = BoardStatus.Enabled;
      var msgs:Message[] = state.msgs.map(msg=>Object.assign({},msg));

      if(!nextNode){
        status = BoardStatus.Wrong;
        msgs[0].severity = "error"
      }else if(nextNode.comment == "RIGHT"){
        status = BoardStatus.Right;
        msgs[0].severity = "success"
      }else{
        if(nextNode.children && nextNode.children.length > 0){
          nextNode = nextNode.children[0];
          move = nextNode.move;
          stones.push({position: move.x + ","+move.y, c: move.c});
          if(!nextNode.children || nextNode.children.length==0){
            status = BoardStatus.Wrong;
            msgs[0].severity = "error"
          }
        }
      }
      return (<any>Object).assign({}, state, {stones:stones, currentNode: nextNode, status:status, msgs:msgs});
    }
    case actions.ActionTypes.RESET:{
      return Object.assign({},initialBoardState);
    }
      
    default:
      return state;
  }
}
