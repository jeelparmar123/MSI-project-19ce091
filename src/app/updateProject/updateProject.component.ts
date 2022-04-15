import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-updateProject',
  templateUrl: './updateProject.component.html',
  styleUrls: ['./updateProject.component.css']
})
export class UpdateprojectComponent implements OnInit {

  addProjectForm: FormGroup
  id: any;
  constructor(private fb: FormBuilder, public router: Router, private _authService: AuthService, private route: ActivatedRoute) {

    this.addProjectForm = this.fb.group({
      projectName: [""],
      deptCode: [""],
      product: [""],
      users: [""] // minlength is set in the html
    })
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getdata();

  }

  getdata() {
    this._authService.getProjectMappingbyid(this.id).subscribe(
      res => {
        console.log(res);
        this.addProjectForm.setValue({
          projectName: res.projectname,
          users: res.users,
          deptCode: res.deptcode,
          product: res.product
        })
      },
      err => {
        console.log(err.error.message);
      }
    )

  }

  onSubmit() {
    const { projectName, deptCode, product, users } = this.addProjectForm.value;
    // const { projectName, users } = this.addProjectForm.value;
    // console.log(projectName, users)
    const id = this.id;
    this._authService.updateProjectMapping({ projectName, users, deptCode, product, id }).subscribe(
      res => {
        // console.log(res.message+"\n"+res.token)
        this.router.navigate(["/projectmapping"]);
      },
      err => {
        console.log(err.error.message);
      }
    )

  }

}
