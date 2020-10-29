import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-confirmation-account',
  templateUrl: './confirmation-account.component.html',
  styleUrls: ['./confirmation-account.component.css']
})
export class ConfirmationAccountComponent implements OnInit {
  token:any

  constructor(private service: AuthService, private route: ActivatedRoute,private router: Router) {
    this.token=this.route.snapshot.queryParams['token'];
    this.service.confirmAccount(this.token).subscribe(
      data =>{if(data== "false") this.router.navigateByUrl("/")}
    )
   }

  ngOnInit() {
  }

}
