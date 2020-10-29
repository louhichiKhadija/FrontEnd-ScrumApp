import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-accept-invitation',
  templateUrl: './accept-invitation.component.html',
  styleUrls: ['./accept-invitation.component.css']
})
export class AcceptInvitationComponent implements OnInit {
  token: any
  id: any

  constructor(private service: AuthService, private route: ActivatedRoute,private router: Router) { 

    this.token=this.route.snapshot.queryParams['token'];
    this.id=this.route.snapshot.params['id'];
    this.service.acceptInvitation(this.id,this.token).subscribe(
      data =>{if(data== "false") this.router.navigateByUrl("/")}
    )
  }

  ngOnInit() {
  }

}
