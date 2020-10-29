import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { ProjectService } from 'src/app/services/project.service';
import { Notification } from '../../notification/notification'

@Component({
  selector: 'app-nav-bar-project',
  templateUrl: './nav-bar-project.component.html',
  styleUrls: ['./nav-bar-project.component.css']
})
export class NavBarProjectComponent implements OnInit {
  isuser:boolean=false;
  projectId: any;
  sprintId: any;

  email: FormControl
  notification=new Notification()

  listUsers=[];
  project: any;

  constructor(private projectService: ProjectService, private route:ActivatedRoute) { 
    this.email = new FormControl('', [Validators.required, Validators.email]);

    this.projectId=this.route.snapshot.params["id"]
    this.projectService.getProjectById(this.projectId).subscribe(
      data =>{
        this.project=data
        this.project.user.forEach(element => {
          let img={ src: 'http://localhost:9000/user/photo/' + element.id}

              this.listUsers.push(img)})
        });
      
    
  }


  ngOnInit() {}

  sendInvitation(){
    if(this.email.status==='VALID'){
      this.projectService.sendInvitation(this.email.value,this.projectId).subscribe(
        data =>{
          console.log(data)
          if(data==="true") this.notification.showNotification('An invitation is sent successfully to this address !','success','top','right')
        },
        err=>{
          this.notification.showNotification("Please check the address mail !!",'danger','top','right')
        }
      )
    }
  }

}
