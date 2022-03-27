import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-addproject',
  templateUrl: './addproject.component.html',
  styleUrls: ['./addproject.component.css']
})
export class AddprojectComponent implements OnInit {

  addProjectForm : FormGroup
  constructor(private fb:FormBuilder, public router:Router,private _authService:AuthService) {
    this.addProjectForm = this.fb.group({
      projectName:[""],
      employeeName:[""] // minlength is set in the html
    })
   }

  ngOnInit(): void {
    
  }

  onSubmit(){
    const {projectName,employeeName} = this.addProjectForm.value;
    console.log(projectName,employeeName)

    this._authService.addProjectMapping({projectName,employeeName}).subscribe(
      res => {
        // console.log(res.message+"\n"+res.token)
        this.router.navigate(["/dashboard"]);
      },
      err =>{ 
        console.log(err.error.message);
      }
    )
    
  }

}
