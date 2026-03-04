import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Employee } from '../../models/employee.model';
import { ReactiveEmployeeForm } from '../reactive-employee-form/reactive-employee-form';
@Component({
  selector: 'app-employee-management',
  imports: [CommonModule, ReactiveEmployeeForm],
  templateUrl: './employee-management.html',
  styleUrl: './employee-management.css',
})
export class EmployeeManagement {
  employees: Employee[] = [
    {
      employeeId: 101,
      employeeName: 'Govinda W',
      dateOfBirth: new Date(1988, 10, 5),
      contactNumber: '9876543210',
      email: 'govind.codedisha@gmail.com',

      address: {
        addressLine1: 'A-101, Green Residency',
        addressLine2: 'Baner Road',
        state: 'Maharashtra',
        city: 'Pune',
        pinCode: '411045',
      },
      designation: 'Software Architect',
      joiningDate: new Date(2020, 1, 15),
      monthlySalary: 85000,
      employeeImage: 'assets/images/default-user.png'
    },
    {
      employeeId: 102,
      employeeName: 'Rahul Sharma',
      dateOfBirth: new Date(1995, 8, 22),
      contactNumber: '9123456789',
      email: 'rahul.codedisha@gmail.com',
      address: {
        addressLine1: 'B-202, Silver Heights',
        addressLine2: 'Andheri East',
        state: 'Maharashtra',
        city: 'Mumbai',
        pinCode: '400069',
      },
      designation: 'HR Manager',
      joiningDate: new Date(2021, 6, 1),
      monthlySalary: 60000,
      employeeImage: 'assets/images/default-user.png'
    }
  ];

  addEmployee(emp: Employee) {
    this.employees = [...this.employees, emp];
  }

  openForm() {

  }


}
