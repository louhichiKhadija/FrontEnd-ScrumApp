import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormControl, Validators } from '@angular/forms';
import { Notification } from '../../notification/notification'

@Component({
  selector: 'app-reset-password-mail',
  templateUrl: './reset-password-mail.component.html',
  styleUrls: ['./reset-password-mail.component.css']
})
export class ResetPasswordMailComponent implements OnInit {

  email: FormControl
  notification=new Notification()
  
  constructor(private authService: AuthService) { 
    this.email = new FormControl('', [Validators.required, Validators.email]);
  }

  ngOnInit() { }

  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
        this.email.hasError('email') ? 'Not a valid email' : '';
  }

  onSubmit(){
    if(this.email.status==='VALID'){
      this.authService.forgotPassword(this.email.value).subscribe(
        data => {},
        err =>{
          console.log(err)
          if(err.status== 200){
            this.notification.showNotification(err.error['text'],'success','top','right')
          }
          else{
          this.notification.showNotification(err.error['text'],'danger','top','right')}
        })
    }
    
  }

  

}
