import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpHeaders } from '@angular/common/http';
import { User } from './user';
import { Observable } from 'rxjs';
import { Todo } from './todo';
@Injectable({
  providedIn: 'root'
})
export class UserUpdateService {

  token: any;

  constructor(private http:HttpClient) { 
    this.token = 'Bearer ' + localStorage.getItem('token');
  }
///////////////////////////////user
  public doRegistration(user):Observable<any>{
    return this.http.post("http://localhost:9000/auth/register",user,{responseType:'text' as 'json'});
  }

  public getUser(email):Observable<any>{
    const header = new HttpHeaders().set('Content-Type', 'text/plain');
    header.set('Authorization', this.token)
    return this.http.post("http://localhost:9000/user/getone",email, {headers:header});  
  }
  public updateUser(id,user):Observable<any>{
    const header = new HttpHeaders().set('Authorization', this.token);
    return this.http.post("http://localhost:9000/user/update/"+id,user,{headers:header});
  }

  public updatePhoto(id, image){
    const header = new HttpHeaders().set('Authorization', this.token);
    return this.http.post("http://localhost:9000/user/update-photo/"+id,image,{headers:header});
  }

 public getphoto(id:User):Observable<any>{
  const header = new HttpHeaders().set('Authorization', this.token);
  const req = new HttpRequest('GET', 'http://localhost:9000/user/photo/'+id ,{
    headers: header,
    reportProgress: true,
    responseType: 'text'
  });
  //return this.http.get("http://localhost:9000/user/photo/"+id);  
  return this.http.request(req);
  }

  updatePassword(id,password){
    const header = new HttpHeaders().set('Content-Type', 'text/plain');
    header.set('Authorization', this.token);
    return this.http.post('http://localhost:9000/user/update-password/'+id, password, {headers: header});
  }
///////////////taches//////
addtaches(todo:Todo, sprintId):Observable<Todo>{
  const header = new HttpHeaders().set('Authorization', this.token);
  return this.http.post<Todo>("http://localhost:9000/taches/add-taches/"+sprintId,todo,{headers:header});
} 


getaches(projectId,idSprint):Observable<Todo[]>{
  const header = new HttpHeaders().set('Authorization', this.token);
  if(idSprint)
  return this.http.get<Todo[]>("http://localhost:9000/taches/getTasksBySprint/"+idSprint,{headers:header});

  else
  return this.http.get<Todo[]>("http://localhost:9000/sprints/getCurrentSprint/"+projectId,{headers:header});
}

filter(tab,property){
return tab.filter(
  (todo)=>{
    return todo.state===property
  }
)
}

updatetaches (todo:Todo):Observable<Todo> {
  const header = new HttpHeaders().set('Authorization', this.token);
  return this.http.post<Todo>("http://localhost:9000/taches/update",todo,{headers:header});
}

deleteTache (id:Todo){
  const header = new HttpHeaders().set('Authorization', this.token);
  return this.http.post('http://localhost:9000/taches/delete'+id,{responseType:'text' as 'json',headers:header});
}
//////////////////////////////////image
uploadImage(file){ 
  const header = new HttpHeaders().set('Authorization', this.token);
  //const header  = new HttpHeaders().set('Content-Type', 'multipart/form-data');
    //return this.httpClient.post('http://localhost:9000/auth/upload-image',file, {headers: header});
    const req = new HttpRequest('POST', 'http://localhost:9000/user/upload-image', file, {
      reportProgress: true,
      responseType: 'text',
      headers:header
    });
 
    return this.http.request(req);
  }





 
 }



