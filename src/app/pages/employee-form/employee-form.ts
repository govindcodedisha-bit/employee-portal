import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Employee } from './employee.model';

@Component({
  selector: 'app-employee-form',
  imports: [FormsModule],
  templateUrl: './employee-form.html',
  styleUrl: './employee-form.css',
})
export class EmployeeForm {
 employee : Employee = this.getEmptyEmployee();

  getEmptyEmployee(): Employee {
    return {
      employeeId: null,
      employeeName: '',
      dateOfBirth: '',
      contactNumber: '',
      addressLine1: ''
    };
  }

  submit( form: NgForm) {
    console.log('Form Submitted', form.value);
    form.resetForm();
    this.employee = this.getEmptyEmployee(); // Reset the employee object
  }
}
