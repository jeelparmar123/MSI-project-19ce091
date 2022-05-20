import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { AddprojectComponent } from './addproject/addproject.component';
import { ProjectmappingComponent } from './projectmapping/projectmapping.component';
import { UpdateprojectComponent } from './updateProject/updateProject.component';
import { UsersComponent } from './userManagement/users.component';


const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent},
    //  ,canActivate:[AuthGuard]},
  
    { path: 'addProject', component: AddprojectComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' },

    { path: 'projectmapping', component: ProjectmappingComponent },

    { path: 'updateProject/:id', component: UpdateprojectComponent },
    { path: 'users', component: UsersComponent },

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})


export class AppRoutingModule { }
export const Components = [LoginComponent, DashboardComponent, AddprojectComponent, ProjectmappingComponent, UpdateprojectComponent, UsersComponent]