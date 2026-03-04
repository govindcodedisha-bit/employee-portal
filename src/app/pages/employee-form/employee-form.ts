import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Employee } from '../../models/employee.model';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employee-form.html',
  styleUrl: './employee-form.css'
})
export class EmployeeFormComponent {

  @Input() employeeData: Employee | null = null;   // 👈 incoming employee
  @Output() save = new EventEmitter<Employee>();
  @Output() close = new EventEmitter<void>();

  isEditMode = false;

  employee: any = {};

  states = ['Maharashtra', 'Gujarat', 'Karnataka', 'Delhi'];
  cities = ['Pune', 'Mumbai', 'Ahmedabad', 'Bangalore', 'Delhi'];

  ngOnInit() {
    if (this.employeeData) {
      this.isEditMode = true;

      // clone to avoid mutating original object before save
      this.employee = { 
        ...this.employeeData,
        address: { ...this.employeeData.address }  // Deep clone nested object
      };

      // convert date to string for date input
      this.employee.dateOfBirth =
        this.formatDate(this.employee.dateOfBirth);

      this.employee.joiningDate =
        this.formatDate(this.employee.joiningDate);
    } else {
      this.employee = {
        address: {
          addressLine1: '',
          addressLine2: '',
          pinCode: ''
        },
        employeeImage: 'assets/images/default-user.png'
      };
    }
  }

  formatDate(date: any) {
    if (!date) return '';
    const d = new Date(date);
    return d.toISOString().substring(0, 10);
  }

  submit(form: any) {

    if (form.invalid) return;

    const newEmployee: Employee = {
      ...this.employee,
      dateOfBirth: new Date(this.employee.dateOfBirth),
      joiningDate: new Date(this.employee.joiningDate),
      address: {
        addressLine1: this.employee.address.addressLine1,
        addressLine2: this.employee.address.addressLine2,
        pinCode: this.employee.address.pinCode
      }
    };
console.log('Adding Employee:', this.employee);
    this.save.emit(newEmployee);

    //form.resetForm();
    
  }

  cancel() {
    this.close.emit();
  }
}