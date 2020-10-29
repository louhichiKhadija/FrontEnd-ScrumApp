import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserUpdateService } from 'src/app/services/user-update.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit {

  addUserForm: FormGroup
  idUser: any

  constructor( private dialogRef: MatDialogRef<UpdatePasswordComponent>,
              @Inject(MAT_DIALOG_DATA) data,
              private userService: UserUpdateService) { 
                this.idUser=data
              }

  ngOnInit() {
    
    this.addUserForm=new FormGroup({
      password: new FormControl('', [Validators.required,Validators.minLength(8)])
    })
  }

  updatePassword(){
    if(this.addUserForm.status=='VALID'){
      console.log(this.addUserForm.value.password)
      this.userService.updatePassword(this.idUser.id, this.addUserForm.value.password)
      this.close()
    }
  }

  close(){
    this.dialogRef.close()
  }

}
