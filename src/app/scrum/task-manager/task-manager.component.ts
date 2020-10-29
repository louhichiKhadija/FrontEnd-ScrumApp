import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem, DropListRef } from '@angular/cdk/drag-drop';
import {MatMenuModule} from '@angular/material/menu';
import { Todo } from 'src/app/services/todo';
import { UserUpdateService } from 'src/app/services/user-update.service';
import * as $ from 'jquery';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';
@Component({
  selector: 'app-task-manager',
  templateUrl: './task-manager.component.html',
  styleUrls: ['./task-manager.component.css']
})
export class TaskManagerComponent implements OnInit {
todos:Todo[]=[];
doing:Todo[]=[];
done:Todo[]=[];
show=false;
title='';
content='';
displayValue='none';
tooo:any;
sprintId: any
projectId: any
project: any;
listUsers= [];

  constructor(private service:UserUpdateService, private route:ActivatedRoute, private projectService: ProjectService) {  }


  ngOnInit() {
    this.projectId=this.route.snapshot.params["id"]
    this.sprintId=this.route.snapshot.params["idSprint"]
    
    this.projectService.getProjectById(this.projectId).subscribe(
      data =>{
        this.listUsers=[]
        this.project=data
        
        this.project.user.forEach(element => {
          
          let img={id:element.id, 
            src: 'http://localhost:9000/user/photo/' + element.id,
            name: element.firstName+" "+element.lastName,
            email: element.email
          }
          console.log(img)
          
              this.listUsers.push(img)
            
            })
            
        });
    

    this.service.getaches(this.projectId,this.sprintId).subscribe(
      (todos)=>{
        this.todos=this.service.filter(todos,'todo');
        this.doing=this.service.filter(todos,'doing');
        this.done=this.service.filter(todos,'done');

      }
     
    );

   
  
  }


  drop(event: CdkDragDrop<string[]>) {7
    //tester le contenue de event 
    console.log(event);
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
   //change state
   const todo=event.item.data;
   //console.log(event.item)
   //console.log(todo)
   todo.state=event.container.element.nativeElement.classList[0];
  
  //change state on database
  /*console.log("saber")*/
   this.service.updatetaches(todo).subscribe(
     (response)=>{
       console.log(response)
         }) 
    }
 
  }

  
display(){
  this.show =! this.show;
  this.displayValue='block';
}
hide(){
  this.displayValue ='none';
  this.show =! this.show;
  this.title='';
  this.content='';
}
addTodo(){
  const todo =new Todo()
  todo.content=this.content
  todo.title=this.title
  todo.state='todo'
  todo.owner=null

 this.service.addtaches(todo, this.sprintId).subscribe(
   (response)=>{ 
     todo.id=response.id 
     this.hide();
   }
 )
 this.todos.push(todo);
 this.show =! this.show;
}
/*close(id){
  const todo =new Todo(this.title,this.content,'todo')
  this.service.deleteTache(id).subscribe
    (data =>{
      this.ngOnInit();
    })
}*/

addOwner(email,id){
 this.projectService.addOwner(email,id).subscribe(
   data => this.ngOnInit()
 )

}

}
