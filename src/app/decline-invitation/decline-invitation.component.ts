import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-decline-invitation',
  templateUrl: './decline-invitation.component.html',
  styleUrls: ['./decline-invitation.component.css']
})
export class DeclineInvitationComponent implements OnInit {
  token:any
  constructor(private service: AuthService, private route: ActivatedRoute,private router: Router) { 
    this.token=this.route.snapshot.queryParams['token'];
    this.service.declineInvitation(this.token).subscribe(
      data =>{if(data== "false") this.router.navigateByUrl("/")}
    )
  }

  ngOnInit() {
  }

}
