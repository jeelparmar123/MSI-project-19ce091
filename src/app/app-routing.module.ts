import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { AddprojectComponent } from './addproject/addproject.component';


const routes:Routes = [
    {path:'login', component:LoginComponent},
    {path:'dashboard', component:DashboardComponent},
    // ,canActivate:[AuthGuard]}
    {path:'addProject', component:AddprojectComponent},
    { path: '',   redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule]
})


export class AppRoutingModule { }
export const Components = [LoginComponent,DashboardComponent,AddprojectComponent]