import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest  } from '@angular/common/http';
import { Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  connectedUser: any;
  token: any;

  constructor(private httpClient: HttpClient, private router: Router) { 
    this.connectedUser = this.getConnectedUser();
    this.token = 'Bearer ' + localStorage.getItem('token');
  }

 
  register(user) {
    const header = new HttpHeaders().set('Content-Type', 'application/json');
    
    return this.httpClient.post('http://localhost:9000/auth/register', user, {headers: header, reportProgress: true,
    responseType: 'text'} );  
  }


  uploadImage(file){ 
    
  //const header  = new HttpHeaders().set('Content-Type', 'multipart/form-data');
    //return this.httpClient.post('http://localhost:9000/auth/upload-image',file, {headers: header});
    const req = new HttpRequest('POST', 'http://localhost:9000/auth/upload-image', file, {
      reportProgress: true,
      responseType: 'text'
    });
    return this.httpClient.request(req);}
  


  login(form){
    const header = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.post('http://localhost:9000/auth/login', form, {headers: header});
  }

  forgotPassword(email){
    const header = new HttpHeaders().set('Content-Type', 'text/plain');
    return this.httpClient.post('http://localhost:9000/auth/forgot-password', email, {headers: header});
  }

  resetPassword(token,password){
    const header = new HttpHeaders().set('Content-Type', 'text/plain');
    return this.httpClient.post('http://localhost:9000/auth/reset-password?token='+token, password, {headers: header});
  }


  getConnectedUser() {
    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token');
      return jwt_decode(token).sub;
    }
  }

  saveToken(token) {
    localStorage.setItem('token', token);
    this.token = 'Bearer ' + localStorage.getItem('token');
    this.connectedUser = this.getConnectedUser();
    //console.log(this.connectedUser);
  }
  removeToken() {
    localStorage.deleteAll();
  }

  validToken() {
    if (localStorage.getItem('token')) {
      return true;
    }
    this.connectedUser = {};
    return false;
  }
  logout() {
    localStorage.clear();
    this.connectedUser = null;
    
  }

  validRestToken(token){
    return this.httpClient.get('http://localhost:9000/auth/reset-password?token='+token, { responseType: 'text'});
  }

  confirmAccount(token){
    return this.httpClient.get('http://localhost:9000/auth/confirm-account?token='+token, { responseType: 'text'});
  }

  acceptInvitation(id,token){
    return this.httpClient.get('http://localhost:9000/acceptInvitation/'+id+'?token='+token, { responseType: 'text'});
  }

  declineInvitation(token){
    return this.httpClient.get('http://localhost:9000/declineInvitation?token='+token, { responseType: 'text'});
  }
}
