import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private loginURL = "http://localhost:3000/login";
  constructor(private http: HttpClient) { }

  loginUser(user:{}){
    return this.http.post<any>(this.loginURL,user);
  }

  addProjectMapping(projectMapping:{}){
    return this.http.post<any>("http://localhost:3000/projectmappinginsert",projectMapping);
  }

  getProjectMapping(){
    return this.http.get<any>("http://localhost:3000/projectmappingget");
  }
  


  logout(){
    sessionStorage.removeItem("token");
  } 

  isLoggedIn(){
    return !!sessionStorage.getItem("token");
  }

  setToken(token:string){
    sessionStorage.setItem("token",token);
  }
  getToken(){
    return sessionStorage.getItem("token");
  }


}
