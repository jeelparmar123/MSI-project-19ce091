import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-addproject',
  templateUrl: './projectmapping.component.html',
  styleUrls: ['./projectmapping.component.css']
})
export class ProjectmappingComponent implements OnInit {



  data: any = []
  constructor(private _authService: AuthService) { }


  ngOnInit(): void {
    this.getdata();
  }

  getdata() {
    this._authService.getProjectMapping().subscribe(
      res => {
        console.log(res)
        this.data = res;

        console.log(this.data);

      },
      err => {
        console.log(err.error.message);
      }
    )
  }
  delete(id: any) {
    this._authService.deleteProjectMapping(id).subscribe(
      res => {
        console.log(res)
        this.getdata();

      },
      err => {
        console.log(err.error.message);
      }
    )
  }
}
