import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
@Component({
  selector: 'app-addproject',
  templateUrl: './addproject.component.html',
  styleUrls: ['./addproject.component.css']
})
export class AddprojectComponent implements OnInit {

  separatorKeysCodes: number[] = [ENTER, COMMA];
  userCtrl = new FormControl();
  filteredFruits: Observable<string[]>;
  fruits: string[] = [];
  allFruits: string[] = [];

  @ViewChild('fruitInput') fruitInput!: ElementRef<HTMLInputElement>;

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.fruits.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.userCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.fruits.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.userCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allFruits.filter(fruit => fruit.toLowerCase().includes(filterValue));
  }

  addProjectForm: FormGroup
  constructor(private fb: FormBuilder, public router: Router, private _authService: AuthService) {
    this.addProjectForm = this.fb.group({
      projectName: [""],
      deptCode: [""],
      product: [""],
      users: [""] // minlength is set in the html

    })

    this.filteredFruits = this.userCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => (fruit ? this._filter(fruit) : this.allFruits.slice())),
    );
  }

  ngOnInit(): void {

  }

  onSubmit() {
    console.log(this.addProjectForm.value);

    const { deptCode, product, projectName } = this.addProjectForm.value;
    // console.log(projectName,users)
    const users = this.fruits.toString();
    // console.log(this.fruits.toString());

    this._authService.addProjectMapping({ projectName, users, deptCode, product }).subscribe(
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
