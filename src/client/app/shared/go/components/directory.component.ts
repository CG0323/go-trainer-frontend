import { Component, Input, Output, ViewChild, EventEmitter} from '@angular/core';
import { MenuItem} from 'primeng/primeng';
import { ProblemRaw } from '../models/index'


@Component({
  moduleId: module.id,
  selector: 'go-directory',
  templateUrl: 'directory.component.html',
  styleUrls: [
    'directory.component.css',
  ],
})

export class DirectoryComponent {
      @ViewChild('menu') menu;
      @Input() menuItems:MenuItem[];
      @Input() problems: ProblemRaw[];
      @Output() selectDirectory = new EventEmitter<any>();
      constructor() {
    }
    
    hideMenu(){
      this.menu.hide();
    }

    onSelectDirectory(id:string){
      this.selectDirectory.emit(id);
    }

    isInMobile(){
        let innerWidth = window.screen.width;
        if(innerWidth <= 800){
            return true;
        }else{
            return false;
        }
    }

    getSelectLabel(){
      if(this.isInMobile()){
        return " ";
      }else{
        return "选择题库";
      }
    }

}


