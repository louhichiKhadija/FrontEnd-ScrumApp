import { Component, OnInit } from '@angular/core';
import { UserUpdateService } from 'src/app/services/user-update.service';

import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ProjectService } from 'src/app/services/project.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { UpdateProfileComponent } from '../update-profile/update-profile.component';
import { UpdatePasswordComponent } from '../update-password/update-password.component';



@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  users: any;
  data: any
  photo: any = File;
  addUserForm: FormGroup
  img : any

  projects:any
  length: any
  recentProjects=[]
  tasks: number

  
  constructor(private userService: UserUpdateService, 
              private authService: AuthService,
              private projectService: ProjectService,
              private dialog: MatDialog) {
    
    

  }

  ngOnInit() {
    this.users={}
    this.img={}
    this.addUserForm=new FormGroup({
      photo: new FormControl('')
    })

    this.userService.getUser(this.authService.getConnectedUser()).subscribe(data => {
      this.users = data;
      this.img={ src: 'http://localhost:9000/user/photo/' + this.users.id}
      this.projectService.getAllProjects().subscribe(
        data=>{
          this.projects=data
          this.length=this.projects.length
          if(this.length<3)
            this.recentProjects=this.projects
          else
          this.recentProjects=[this.projects[this.length-1],this.projects[this.length-2],this.projects[this.length-3] ]
        })
    })

    
   
  }

  editProfile(){
      const dialogConfig = new MatDialogConfig();
      //dialogConfig.position ={right: '180px','top':'200px'};
      dialogConfig.disableClose= true;
      dialogConfig.autoFocus=false;
      const dialogRef=this.dialog.open(UpdateProfileComponent, dialogConfig); 

      dialogRef.afterClosed().subscribe(
         data => {
          this.users=data
         })
  }

  editPassword(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.height='350px';
    dialogConfig.width='550px';
    dialogConfig.disableClose= true;
    dialogConfig.autoFocus=false;
    dialogConfig.data={"id": this.users.id}
    this.dialog.open(UpdatePasswordComponent, dialogConfig); 
}

  handleImage(event) {
    this.photo = event.target.files[0];
    let formData = new FormData();
    formData.append("file", this.addUserForm['controls'].photo.value);
    formData.append("file", this.photo);
    this.addUserForm['controls'].photo.setValue(this.photo.name);
  
    this.userService.uploadImage(formData).subscribe(
      data=>{
        this.userService.updatePhoto(this.users.id, this.addUserForm.value.photo).subscribe(
          res => this.ngOnInit()
        )});
  }


}



