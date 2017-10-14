import { Component, OnInit } from '@angular/core';
// import { EmployeeService } from '../employee.service';
import { Employee, employees } from '../../assets/employee-data';
import { Router } from '@angular/router'


@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent {
  router: Router;
  employees = employees;
  selectedEmployee: Employee;


  editHero(employee) {
    this.router.navigate(['details'])
  }

  removeItem(i) {
    this.employees.splice(i, 1);
  }

}
