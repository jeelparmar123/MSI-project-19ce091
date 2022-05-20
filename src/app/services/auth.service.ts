import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginURL = "http://localhost:3000/login";
  constructor(private http: HttpClient) { }

  loginUser(user: {}) {
    return this.http.post<any>(this.loginURL, user);
  }

  bulkimport(projectMappings: { projectname: string; employeename: string; }[]) {
    return this.http.post<any>("http://localhost:3000/bulkimport", projectMappings);
  }

  addProjectMapping(projectMapping: { projectName: any, users: any, deptCode: any, product: any }) {
    return this.http.post<any>("http://localhost:3000/projectmappinginsert", projectMapping);
  }

  getUsers() {
    return this.http.get<any>("http://localhost:3000/users");
  }

  updateProjectMapping(projectMapping: { projectName: any, users: any, deptCode: any, product: any, id: any }) {
    return this.http.post<any>("http://localhost:3000/projectmappingupdate", projectMapping);
  }
  deleteProjectMapping(id: any) {
    return this.http.delete<any>("http://localhost:3000/projectmappingdelete/" + id);
  }

  deleteProjectMappingBulk(ids: number[]) {
    console.log(ids);
    let options = {
      body: ids
    }
    return this.http.delete<any>("http://localhost:3000/projectmappingdeletebulk/", options);
  }

  getProjectMapping() {
    return this.http.get<any>("http://localhost:3000/projectmappingget");
  }

  getProjectMappingbyid(id: any) {
    return this.http.get<any>("http://localhost:3000/projectmappinggetbyid/" + id);
  }


  logout() {
    sessionStorage.removeItem("token");
  }

  isLoggedIn() {
    return !!sessionStorage.getItem("token");
  }

  setToken(token: string) {
    sessionStorage.setItem("token", token);
  }
  getToken() {
    return sessionStorage.getItem("token");
  }


}
