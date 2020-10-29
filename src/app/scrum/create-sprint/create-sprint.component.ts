import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ProjectService } from 'src/app/services/project.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatListOption } from '@angular/material/list'
import { Notification } from '../../notification/notification'

@Component({
  selector: 'app-create-sprint',
  templateUrl: './create-sprint.component.html',
  styleUrls: ['./create-sprint.component.css']
})
export class CreateSprintComponent implements OnInit {

  sprintForm: FormGroup
  availableTasks: any;
  restTasks=[]
  selected=[]
  id: any;
  projectId: any;
  notification=new Notification()


  constructor(private projectService: ProjectService, private router: Router, private route:ActivatedRoute) { 
   

     /* if (this.availableTasks==null) {
        this.notification.showNotification('There is not any available task','danger','top','right')
        router.navigateByUrl("/scrum/project/"+this.projectId+"/list-sprints")
      }*/
     
    
  }

  ngOnInit() {

    this.projectId=this.route.snapshot.params["id"]

    this.projectService.getNonTakenTasks(this.projectId).subscribe(
      data =>{
        this.availableTasks=data
      })

    this.sprintForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl(''),
      project: new FormControl(this.projectId),
    })
  }

  onGroupsChange(options:  MatListOption[]) {
    this.selected=[]

    options.map(o =>{
      
      this.selected.push(o.value)

     
    })
  }
  
  save(){
    if(this.sprintForm.controls['name'].status=='VALID' && this.selected.length != 0){
      //if(this.selected.length==this.availableTasks.length) this.availableTasks=[]
      /*this.selected.map(idTask =>{
        this.availableTasks.splice(idTask[1],1,"")
      })*/
      

      this.projectService.createSprint(this.sprintForm.value).subscribe(
        data =>{
          this.id=data
          this.selected.map(idTask =>{
           
            let i
            for(i = 0; i < this.availableTasks.length; i++){
              if (this.availableTasks[i].id === idTask){
                 this.availableTasks.splice(i, 1); }}
            //this.availableTasks.splice(idTask[1],1)
            this.projectService.addTaskToSprint(this.id,idTask).subscribe()
          })
          
          this.sprintForm = new FormGroup({
            name: new FormControl('', Validators.required),
            description: new FormControl(''),
            project: new FormControl(this.projectId),
          })
        })
        
        this.notification.showNotification('The new sprint is added successfully','success','top','right')
       
    }
   
  }

}
