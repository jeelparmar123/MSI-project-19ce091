import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  fileToUpload: File | null = null;
  csvContent: string | null = null;
  // as: AuthService | null = null;

  lines: any;

  constructor(private router: Router, private _authService: AuthService) {
    console.log(_authService);
    // this.as = _authService
  }

  handlefile(files: Event) {
    const target = files.target as HTMLInputElement;
    if (!target.files?.length) {
      return;
    }
    this.fileToUpload = target.files[0];

    const self = this;
    const fileReader = new FileReader();
    fileReader.onload = function (e) {
      console.log(fileReader.result);
      self.lines = fileReader.result;
      self.lines = self.lines.split('\n');
      console.log(self.lines);

      const reqs = [];
      for (const line of self.lines) {
        const req = {
          projectname: line.split(',')[0],
          employeename: line.split(',')[1],
          deptcode: line.split(',')[2],
          product: line.split(',')[3]
        }
        reqs.push(req);
      }
      console.log(reqs);
      // console.log(selfp._authService);
      self._authService.bulkimport(reqs).subscribe(
        res => {
          // console.log(res.message+"\n"+res.token)
          self.router.navigate(["/projectmapping"]);
        },
        err => {
          console.log(err.error.message);
        }
      )

    }
    // fileReader.onload = this.onFileLoad;
    fileReader.readAsText(this.fileToUpload, "UTF-8");
  }

  // onFileLoad(fileLoadedEvent: any) {
  //   const textFromFileLoaded = fileLoadedEvent.target.result;
  //   this.csvContent = textFromFileLoaded;

  //   const lines: string[] = this.csvContent!.split('\n');
  //   const reqs = [];
  //   for (const line of lines) {
  //     const req = {
  //       projectname: line.split(',')[0],
  //       employeename: line.split(',')[1]
  //     }
  //     reqs.push(req);
  //   }
  //   console.log(reqs);
  //   // console.log(selfp._authService);
  //   this._authService.bulkimport(reqs).subscribe(
  //     res => {
  //       // console.log(res.message+"\n"+res.token)
  //       this.router.navigate(["/projectmapping"]);
  //     },
  //     err => {
  //       console.log(err.error.message);
  //     }
  //   )
  //   // alert(this.csvContent);
  // }


  ngOnInit(): void {
  }
  @Output() public sidenavToggle = new EventEmitter();
  logout() {
    console.log("logout function called");
    this._authService.logout();
    this.router.navigate(['/login']);
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

}
