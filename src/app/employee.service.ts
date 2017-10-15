import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/Rx';
import { employees, Employee } from '../assets/employee-data'

@Injectable()
export class EmployeeService {
    userRole: string;
    userIndex: number;

    swapRole(currentRole: string): void {
        if (this.userRole == 'Admin') {
            employees[this.userIndex].role = 'User';
            this.userRole = 'User';
        } else if (this.userRole == 'User'){
            employees[this.userIndex].role = 'Admin';
            this.userRole = 'Admin';
        }

    }
}
