import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  allProjects: any

  constructor(private service: ProjectService) { 
    this.service.getAllProjects().subscribe( 
      data => {
        this.allProjects=data}
    )
  }

  ngOnInit() {
  }

  /*deleteProject(id, index){
    this.allProjects.splice(index,1)
    this.service.deleteProject(id).subscribe()
  }*/

}
