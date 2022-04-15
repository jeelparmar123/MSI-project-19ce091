import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  data: any = []
  constructor(private _authService: AuthService) { }


  ngOnInit(): void {
    this.getdata();
  }

  getdata() {
    this._authService.getUsers().subscribe(
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
}
