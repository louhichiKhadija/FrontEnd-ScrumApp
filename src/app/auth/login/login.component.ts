import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service'
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Notification } from '../../notification/notification'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  msg: String;
  isLoginFailed = false;
  hide:boolean;
  notification=new Notification()
  

  constructor(private authService: AuthService, 
              private router: Router,
              private dialogRef: MatDialogRef<LoginComponent>,) { 
  
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required,Validators.email]),
      password: new FormControl('', Validators.required),
    });

    this.hide=true
  }

  login(){
    this.authService.login(this.loginForm.value).subscribe(
      data =>{
        this.authService.saveToken(data['token'])
        this.isLoginFailed = false
        this.close()
        this.router.navigateByUrl("/scrum/user-details")},
      err => {
        if(err.error['message']=='Unauthorized'){
          this.isLoginFailed=true
          this.notification.showNotification('Please check your informations !!','danger','top','right')}
        
      })
    
    }


    close() {
      this.dialogRef.close();}
    
  }


