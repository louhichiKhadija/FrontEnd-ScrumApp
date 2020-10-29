import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators} from '@angular/forms';
import { ProjectService } from 'src/app/services/project.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  form: FormGroup;
  id: any;

  constructor(private fb: FormBuilder, private serviceProject: ProjectService, private router: Router) {
    this.form = fb.group({
      'name': new FormControl(''),
      'description': new FormControl(''),
      'user': fb.array([])
    });
  }
  ngOnInit() {
    
  }


  addTask(userIndex: number, data?: any) {
    let fg = this.fb.group({
        'task': [data ? data : '', Validators.compose([Validators.required])],
    });
    (<FormArray>(<FormGroup>(<FormArray>this.form.controls['user'])
        .controls[userIndex]).controls['tasks']).push(fg);

}

deleteTask(userIndex: number, index: number) {
  if(index>=1)
    (<FormArray>(<FormGroup>(<FormArray>this.form.controls['user'])
        .controls[userIndex]).controls['tasks']).removeAt(index);
}

addUserStory(user?: any) {
    let fg = this.fb.group({
        'name': [user ? user.name : '', Validators.compose([Validators.required])],
        'tasks': this.fb.array([]),
    });
    (<FormArray>this.form.get('user')).push(fg);
    let userIndex = (<FormArray>this.form.get('user')).length - 1;
    if (!user) {
        this.addTask(userIndex);
    }
    else {
        user.tasks.forEach(task => {
            this.addTask(userIndex, task);
        });
    }
}

deleteUserStroy(index: number) {
  if(index>=1)
    (<FormArray>this.form.get('user')).removeAt(index);
}


addProject(){
  if(this.form.status==='VALID' && this.form.controls['user'].touched===true){
    
    this.serviceProject.addProject(this.form.value.name).subscribe(
      data=>{
        this.id=data

        this.form.value.user.map(userStory =>{
          let idUserStory;
          this.serviceProject.addUserStory(userStory.name, this.id).subscribe(
            data=>{
              idUserStory=data
              userStory.tasks.map( task=>{
                this.serviceProject.addTask(idUserStory, task).subscribe()
              })

            })
          
        })
        
        this.router.navigateByUrl("/scrum/project/"+this.id+"/list-sprints")
      })

     
    }
  }

}
