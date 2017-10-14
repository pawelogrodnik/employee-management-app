import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { positions, roles, Employee, employees } from '../../assets/employee-data';
// import { EmployeeService } from '../employee.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss']
})
export class EmployeeDetailsComponent implements OnChanges {
  employeeForm: FormGroup;
  currentEp: any;
  roles = roles;
  // router: Router;
  positions = positions;
  employeeData: any;
  showError: boolean = false;
  showSuccess: boolean = false;
  // epservice: EmployeeService

  constructor(private fb: FormBuilder, activateRoute: ActivatedRoute, private router: Router) {
    this.employeeData = activateRoute.snapshot.paramMap;
    this.createForm();
    console.log(this.employeeForm.controls);
  }
  createForm() {
    this.employeeForm = this.fb.group({
      // firstName: [{value: this.employeeData.get('firstName'), disabled: true}, [Validators.required]],
      firstName: [{value: this.employeeData.get('firstName'), disabled: true}],
      
      // lastName: [{value: this.employeeData.get('lastName'), disabled: true}, [Validators.required]],
      lastName: [{value: this.employeeData.get('lastName'), disabled: true}],      
      position: {value: this.employeeData.get('position'), disabled: true},
      role: this.employeeData.get('role'),
      experience: [this.employeeData.get('experience'), [Validators.required]],
      shortDescription: [this.employeeData.get('shortDescription'), [Validators.required, Validators.maxLength(100)]],
      longDescription: [this.employeeData.get('longDescription'), [Validators.required, Validators.minLength(100)]],
    })
  }
  ngOnChanges() {
    this.employeeForm.reset({
      firstName: this.employeeData.get('firstName'),
      lastName: this.employeeData.get('lastName'),
      position: this.employeeData.get('position'),
      role: this.employeeData.get('role'),
      experience: this.employeeData.get('experience'),
      shortDescription: this.employeeData.get('shortDescription'),
      longDescription: this.employeeData.get('longDescription'),
    });
  }
  saveHero(): void {
    this.showError = false;
    this.showSuccess = false;
    if (this.employeeForm.status == 'VALID'){
      this.currentEp = this.prepareNewEmployeeData();
      const oldEp = employees.find(employee => employee.id == this.currentEp.id);
      const newEp = Object.assign(oldEp, this.currentEp);
      this.showSuccess = true;
      setTimeout(()=>{
        this.router.navigate(['employee']);    
      }, 2000)
    } else {
      this.showError=true;
    }

  }
  prepareNewEmployeeData(): Employee {
    const formData = this.employeeForm.value;
    const currentEmploye = {
      id: this.employeeData.get('id'),
      firstName: formData.firstName == undefined ? this.employeeData.get('firstName') : formData.firstName,
      lastName: formData.lastName == undefined ? this.employeeData.get('lastName') : formData.lastName,
      position: formData.position == undefined ? this.employeeData.get('position') : formData.position,
      role: formData.role,
      experience: formData.experience,
      shortDescription: formData.shortDescription,
      longDescription: formData.longDescription
    }
    console.log(currentEmploye);
    return currentEmploye;

  }
  revert() { this.ngOnChanges(); }

}
