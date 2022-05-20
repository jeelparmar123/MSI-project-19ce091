import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-addproject',
  templateUrl: './projectmapping.component.html',
  styleUrls: ['./projectmapping.component.css']
})
export class ProjectmappingComponent implements OnInit {

  idList: Set<any> = new Set();

  data: any = []
  constructor(private _authService: AuthService) {
   }

  
  ngOnInit(): void {
    this.getdata();
    this.idList = new Set();
    
  }

  export(){
    console.log(Array.from(this.idList))
    let csvData;

    if(this.idList.size > 0) {
      csvData = this.ConvertToCSV(Array.from(this.idList), ['projectname','users', 'deptcode', 'product', 'status']);;
    } else {
      csvData = this.ConvertToCSV(this.data, ['projectname','users', 'deptcode', 'product', 'status']);
    }
    console.log(csvData)
    let blob = new Blob(['\ufeff' + csvData], { type: 'text/csv;charset=utf-8;' });
    let dwldLink = document.createElement("a");
    let url = URL.createObjectURL(blob);
    let isSafariBrowser = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1;
    if (isSafariBrowser) {  //if Safari open in new window to save file with random filename.
        dwldLink.setAttribute("target", "_blank");
    }
    dwldLink.setAttribute("href", url);
    dwldLink.setAttribute("download", "data.csv");
    dwldLink.style.visibility = "hidden";
    document.body.appendChild(dwldLink);
    dwldLink.click();
    document.body.removeChild(dwldLink);
  }

  ConvertToCSV(objArray: any, headerList: any) {
    let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    let str = '';
    let row = 'S.No,';

    for (let index in headerList) {
        row += headerList[index] + ',';
    }
    row = row.slice(0, -1);
    str += row + '\r\n';
    for (let i = 0; i < array.length; i++) {
        let line = (i+1)+'';
        for (let index in headerList) {
           let head = headerList[index];

            line += ',' + array[i][head];
        }
        str += line + '\r\n';
    }
    return str;
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
  openDialog(){

  }
  delete(id: any) {
    if (confirm("Are you sure to delete!")) {
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
  bulkDelete() {
    let ids: any = []
    this.idList.forEach(element => {
      ids.push(element.id)
    });
    console.log(ids)
    if (confirm("Are you sure to delete selected!")) {
      this._authService.deleteProjectMappingBulk(ids).subscribe(
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

  addOrRemove(id: any) {
    if(this.idList.has(id)) {
      this.idList.delete(id);
    } else {
      this.idList.add(id);
    }
    console.log(this.idList)
  }
}
