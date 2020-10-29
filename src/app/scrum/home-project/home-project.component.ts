import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

import { UserUpdateService } from 'src/app/services/user-update.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-home-project',
  templateUrl: './home-project.component.html',
  styleUrls: ['./home-project.component.css']
})
export class HomeProjectComponent implements OnInit {
  
  constructor() { }
  
  ngOnInit() {
    // this.userService.getAllState()
    // .subscribe(data=>{
    //   console.log(data);
    //   this.listState=data;
    //   console.log("saber"+this.listState);
    // })

// this.userService.getstate(1)
// .subscribe(data=>{
//   this.afaire=data;
  
// })    

// this.userService.getstate(2)
// .subscribe(data=>{
//   this.encours=data;
// })  

// this.userService.getstate(3)
// .subscribe(data=>{
//   this.terminer=data;
// })  

// this.userService.getstate(4)
// .subscribe(data=>{
//   this.neww=data;
// })


}



}
