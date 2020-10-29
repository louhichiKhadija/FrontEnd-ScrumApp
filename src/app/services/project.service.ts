import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest  } from '@angular/common/http';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  idCurrentSprint: any;
  token: any
  connectedUser: any

  constructor(private httpClient: HttpClient) { 
    this.connectedUser = this.getConnectedUser();
    this.token = 'Bearer ' + localStorage.getItem('token');
  }

  // ajouter un Sprint 
  createSprint(form){
    const header = new HttpHeaders().set('Authorization', this.token);

    let sprint={
      name: form.name,
      description: form.description,
      current: false}
      
      return this.httpClient.post('http://localhost:9000/sprints/addSprint', sprint, {headers: header});
  }

  addTaskToSprint(id,idTask){
    const header = new HttpHeaders().set('Authorization', this.token);
    return this.httpClient.get('http://localhost:9000/sprints/addTaskToSprint/'+id+'/'+idTask, {headers: header})
  }

  //get available tasks = non taken tasks
  getNonTakenTasks(id){
    const header = new HttpHeaders().set('Authorization', this.token);
    return this.httpClient.get('http://localhost:9000/taches/nonTakenTasks/'+id,{headers: header})
  }

  
  getAllSprint(id){
    const header = new HttpHeaders().set('Authorization', this.token);
    return this.httpClient.get('http://localhost:9000/sprints/getSprintsByProject/'+id,{headers: header})
  }

  getAllProjects(){
    const header = new HttpHeaders().set('Authorization', this.token);
    this.connectedUser=this.getConnectedUser()
    console.log(this.connectedUser)
    return this.httpClient.get('http://localhost:9000/getAllProjects/'+this.connectedUser,{headers: header})
  }

  addProject(project){
    const header = new HttpHeaders().set('Authorization', this.token);
    project={name: project}
    this.connectedUser=this.getConnectedUser()
    console.log("add project for"+this.connectedUser)
    return this.httpClient.post('http://localhost:9000/add-project/'+this.connectedUser,project,{headers: header})
  }

  deleteSprint(id){
    const header = new HttpHeaders().set('Authorization', this.token);
    return this.httpClient.get('http://localhost:9000/sprints/deleteSprint/'+id,{headers: header})
  }
  
  sendInvitation(email,projectId){
    const header = new HttpHeaders().set('Authorization', this.token);
    header.set('Content-Type', 'text/plain');
    return this.httpClient.post('http://localhost:9000/invit-member/'+projectId, email, {headers: header});
  }

  getUsersByProject(id){
    const header = new HttpHeaders().set('Authorization', this.token);
    return this.httpClient.get('http://localhost:9000/getUsersImagesByProject/'+id, {headers: header});
  }
  
  getProjectById(id){
    const header = new HttpHeaders().set('Authorization', this.token);
    return this.httpClient.get('http://localhost:9000/project/'+id, {headers: header}); 
  }

  downloadUserImage(id){
    const header = new HttpHeaders().set('Authorization', this.token);
    return this.httpClient.get('http://localhost:9000/user/photo/'+id, {headers: header}); 
  }

  addTask(id,task){
    const header = new HttpHeaders().set('Authorization', this.token);
    task= {title: task.task,
      content: "i don't know !",
      state: "todo"
    }

    return this.httpClient.post('http://localhost:9000/taches/add/'+id,task, {headers: header}); 
  }

  addUserStory(userStory, idProject){
    const header = new HttpHeaders().set('Authorization', this.token);
    userStory={name: userStory}
    return this.httpClient.post('http://localhost:9000/userStory/addUserStory/'+idProject,userStory, {headers: header}); 
  }


  getConnectedUser() {
    if (localStorage.getItem('token')) {
    const token = localStorage.getItem('token');
    return jwt_decode(token).sub;}
  }

  addOwner(email,id){
    const header = new HttpHeaders().set('Authorization', this.token);
    return this.httpClient.post('http://localhost:9000/taches/addOwner/'+id,email, {headers: header}); 

  }

  /*deleteProject(id){
    const header = new HttpHeaders().set('Authorization', this.token);
    return this.httpClient.get('http://localhost:9000/delete-project/'+id,{headers: header});
  }*/



}