import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { employees } from '../../assets/employee-data';
import { Router } from '@angular/router';
import { EmployeeService } from '../employee.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  loggedUser: any;
  userID: number;
  loginFailure: boolean = false;

  constructor(private router: Router, private fb: FormBuilder, private epService: EmployeeService) {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      user: ['', [Validators.required]],
      pass: ['', [Validators.required]]
    })
  }
  auth(loggedData){
    let authData  = employees.find((user) => {
      this.userID = user.id;
      return ((user.login == loggedData.user) && (user.password == loggedData.pass)) 
    })
    return authData;
  }
  login() {
    const userData = this.loginForm.value;
    if (this.auth(userData)) {
      this.loginFailure = false;
      // console.log(employees[this.userID - 1]);
      this.epService.userRole = employees[this.userID-1].role;
      this.epService.userIndex =this.userID-1;
      this.router.navigate(['employee', employees[this.userID - 1]]);
    } else {
      this.loginFailure = true;
    }
  }

}
