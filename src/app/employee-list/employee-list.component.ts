import { Component, OnInit } from '@angular/core';
import { Employee, employees } from '../../assets/employee-data';
import { ActivatedRoute, Router } from '@angular/router'
import { EmployeeService } from '../employee.service';


@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent {
  employees = employees;
  selectedEmployee: Employee;
  loggedUserRole: string;
  editHeroErr: boolean = false;
  constructor(private router: Router, private route: ActivatedRoute, private epService: EmployeeService) {
    if (this.epService.userRole == undefined) {
      this.router.navigate(['login']);
    }
  }

  editHero(employee) {
    this.editHeroErr = false;
    if (this.checkPermission(employee)) {
      this.router.navigate(['details', employee]);
    } else {
      this.showError();
    }

  }

  removeItem(i, employee) {
    this.editHeroErr = false;
    if (this.checkPermission(employee)) {
      this.employees.splice(i, 1);
    } else {
      this.showError();
    }
  }
  checkPermission(employee) {
    const isAdmin = this.epService.userRole == 'Admin';
    const employeeIsProtected = employee.position == 'Admin' || employee.position == 'Manager';
    return isAdmin || !employeeIsProtected;
  }
  showError() {
    this.editHeroErr = true;
    setTimeout(() => { this.editHeroErr = false }, 3000)
  }

}
