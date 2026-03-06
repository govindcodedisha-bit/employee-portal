import { Injectable } from '@angular/core';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {

  private employees: Employee[] = [
    {
      employeeId: 101,
      employeename: 'Govinda W',
      dateOfBirth: new Date(1988, 10, 5),
      contactNumber: '9876543210',
      email: 'govind.codedisha@gmail.com',
      skills: ['Angular', 'TypeScript', 'Node.js'],
      address: {
        addressline1: 'A-101, Green Residency',
        addressline2: 'Baner Road',
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
      employeename: 'Rahul Sharma',
      dateOfBirth: new Date(1995, 8, 22),
      contactNumber: '9123456789',
      email: 'rahul.codedisha@gmail.com',
      skills: undefined,
      address: {
        addressline1: 'B-202, Silver Heights',
        addressline2: 'Andheri East',
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

  constructor() { }

  getEmployees(): Employee[] {
    return this.employees;
  }

  saveEmployee(emp: Employee) {
    const index = this.employees.findIndex(e => e.employeeId === emp.employeeId);
    emp.employeeImage = 'assets/images/default-user.png'; // Set default image for new employee
    if (index !== -1) {
      const updatedEmployees = [...this.employees];
      updatedEmployees[index] = emp;
      this.employees = updatedEmployees;
    } else {
      this.employees = [...this.employees, emp];
    }
  }

  deleteEmployee(empId: number) {
    this.employees = this.employees.filter(e => e.employeeId !== empId);
  }

}
