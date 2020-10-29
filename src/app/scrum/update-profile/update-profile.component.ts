import { FormsModule, FormControl } from '@angular/forms';
import { ChangeDetectionStrategy,Component, OnInit ,ViewEncapsulation} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


import { User } from 'src/app/services/user';
import { UserUpdateService } from 'src/app/services/user-update.service';
import { AuthService } from 'src/app/services/auth.service';
                                                   
@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css'],
  //encapsulation: ViewEncapsulation.None,
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class UpdateProfileComponent implements OnInit {
users: any
id:number
message:any;
photo: any = File;
addUserForm: FormGroup;



  constructor(private authService: AuthService,
              private userService : UserUpdateService,
              private router: Router,
              private dialogRef: MatDialogRef<UpdateProfileComponent>) {

  }

  ngOnInit() {
    this.addUserForm=new FormGroup({
      firstName:new FormControl('',[Validators.required]),
      lastName:new FormControl('',[Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
    });   

    this.userService.getUser(this.authService.connectedUser).subscribe(data =>{
      this.users=data;
      this.addUserForm.controls['firstName'].setValue(this.users.firstName)
      this.addUserForm.controls['lastName'].setValue(this.users.lastName)
      this.addUserForm.controls['email'].setValue(this.users.email)
    })
     
  }


  updateUser(){
    if(this.addUserForm.controls['firstName'].status=='VALID' && this.addUserForm.controls['lastName'].status=='VALID'
    && this.addUserForm.controls['email'].status=='VALID'){
      this.userService.updateUser( this.users.id,this.addUserForm.value).subscribe(
        (data)=>{
          this.dialogRef.close(this.addUserForm.value) 
        });
      }
  }


  close() {
    this.dialogRef.close()
  }

  

}
