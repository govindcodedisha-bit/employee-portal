import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Employee } from '../../models/employee.model';
import { ReactiveEmployeeForm } from '../reactive-employee-form/reactive-employee-form';
import { EmployeeService } from '../../services/employee';
@Component({
  selector: 'app-employee-management',
  imports: [CommonModule, ReactiveEmployeeForm],
  templateUrl: './employee-management.html',
  styleUrl: './employee-management.css',
})
export class EmployeeManagement {
  selectedEmployee: Employee | null = null;
  employeeToDelete: Employee | null = null;
  showDeleteModal = false;
  showFormModal = false
  employees: Employee[] = [];

  constructor(private employeeService: EmployeeService) {
    this.employees = this.employeeService.getEmployees();
  }

  
  saveEmployee(emp: Employee) {
    this.employeeService.saveEmployee(emp);
    this.employees = this.employeeService.getEmployees(); // Refresh the list after save
    this.showFormModal = false;
  }

  openForm() {
    this.showFormModal = true
    this.selectedEmployee = null; // Clear selected employee for new entry
  }

  closeFormModal() {
    this.showFormModal = false;
    this.selectedEmployee = null; // Clear selected employee when closing modal
  }

  editEmployee(emp: Employee) {
    this.selectedEmployee = emp;
    this.showFormModal = true;
  }

  openDeleteConfirm(emp: Employee) {
    this.showDeleteModal = true;
    this.employeeToDelete = emp;
  }
  closeDeleteModal() {
    this.showDeleteModal = false;
    this.employeeToDelete = null;
  }
  confirmDelete() {
    if (this.employeeToDelete) {
      this.employeeService.deleteEmployee(this.employeeToDelete.employeeId ?? 0);
      this.employees = this.employeeService.getEmployees(); // Refresh the list after deletion
      this.employeeToDelete = null;
    }
    this.showDeleteModal = false;
  }
}
