import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  data:any=[]
  constructor(private _authService:AuthService) { }
 

  ngOnInit(): void {
    this._authService.getProjectMapping().subscribe(
      res => {
        console.log(res)
       this.data=res;

       console.log(this.data);
       
      },
      err =>{ 
        console.log(err.error.message);
      }
    )
  }

}
