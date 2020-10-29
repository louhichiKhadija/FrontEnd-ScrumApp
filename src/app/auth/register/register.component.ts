import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { MatDialogRef } from '@angular/material';
import { Notification } from '../../notification/notification'


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  photo: any = File;
  notification=new Notification

  constructor(private authService: AuthService,
    private dialogRef: MatDialogRef<RegisterComponent>) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.registerForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      photo: new FormControl('')
    })
  }

  register() {
    if(this.registerForm.status=='VALID'){
    this.authService.register(this.registerForm.value).subscribe(
      res => {
      //console.log(res);
      this.notification.showNotification('Congridulation ! You are now registred \n Please check your mail to confirme your registration','success','top','right')
      this.close()
    },
 
      err =>{ this.notification.showNotification(err.error['text'],'danger','top','right')}
      
      );
    this.registerForm.reset()
  }}

  handleImage(event) {
    this.photo = event.target.files[0];
    let formData = new FormData();
    formData.append("file", this.registerForm['controls'].photo.value);
    formData.append("file", this.photo);
    this.registerForm['controls'].photo.setValue(this.photo.name);
  
    this.authService.uploadImage(formData).subscribe(
      //(res) => console.log(res),
      //(err) => console.log(err)
    );

    
  }

  close(){
    this.dialogRef.close()
  }

}
