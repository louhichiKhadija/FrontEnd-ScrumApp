import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, Validator, ValidationErrors,NG_VALIDATORS } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Notification } from '../../notification/notification'

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  
  restPasswordForm: FormGroup;
  id: any;
  user: any;
  token: String;
  hide_password: boolean;
  hide_confirmation: boolean;
  notification=new Notification()

  constructor(private authService: AuthService,private route: ActivatedRoute, private router: Router) {
    this.restPasswordForm = new FormGroup({
      password: new FormControl('', Validators.required),
      confirmation: new FormControl('', Validators.required),

    });
    this.token=this.route.snapshot.queryParams['token'];

    this.authService.validRestToken(this.token).subscribe(
      data =>{
        //console.log(data)
        if(data== "false") this.router.navigateByUrl("/")
       }
    ) 
      

   }

  ngOnInit() {
    this.hide_password=true;
    this.hide_confirmation=true;
  }

  onSubmit(){
    if(this.token !=null && this.restPasswordForm.status==='VALID')
      this.authService.resetPassword(this.token, this.restPasswordForm.value.password).subscribe(
        data => {},
          
        err =>{
          if(err.status== 200){
            this.notification.showNotification('Password is reset ! You can now login to your account using the new password','success','top','right')
            this.router.navigateByUrl("/")
          }
          else
          this.notification.showNotification(err.error['text'],'danger','top','right')
        })
    else this.notification.showNotification("Error has been accurent while sending your request ! \n Please check the link and try again",'warning','top','right')
  }
      

}
