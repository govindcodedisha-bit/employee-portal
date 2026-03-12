import { ChangeDetectorRef, Component, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Employee } from '../../models/employee.model';
import { ReactiveEmployeeForm } from '../reactive-employee-form/reactive-employee-form';
import { EmployeeService } from '../../services/employee';
import { catchError, filter, map, Observable, of, tap } from 'rxjs';
import { error } from 'node:console';
import { emailError } from '@angular/forms/signals';

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
  // expose observable directly
  employees$!: Observable<Employee[]>;
  employees = signal<Employee[]>([]);

  constructor(private employeeService: EmployeeService, private cdr: ChangeDetectorRef) {
    effect(() => { console.log("effect has triggerd: Count changed:", this.employees()); });

  }

  ngOnInit() {
    this.loadEmployees();
  }

  loadEmployees() {
    //this.employees$ = this.employeeService.getEmployees();
    this.employeeService.getEmployees()
      .pipe(
        map((employees: Employee[]) =>
          employees.filter(e => e.monthlySalary && e.monthlySalary < 50000)
            .map(e => ({
              ...e,
              employeename: e.employeename.toUpperCase()
            }))
        ),
        tap(data => console.log("Filtered data:", data)),
        catchError(err => { console.log("Error occurred", err); return of([]); })
      )
      .subscribe({
        next: (data: Employee[]) => {
          this.employees.update(() => data)
        }
        ,error: (error) => {
          console.log(error)
        },
        complete: () => {
          console.log("API successfull")
        }
      }
      )
  }

  saveEmployee(emp: Employee) {
    this.employeeService.saveEmployee(emp).subscribe({
      next: () => {
        // reload employees from API after save
        console.log("save employee successfull.");
        this.showFormModal = false;
        this.selectedEmployee = null;
        this.loadEmployees();
        this.cdr.detectChanges();   // 🔹 force UI update
        console.log("employees reload");

      },
      error: (err) => {
        console.error('Error saving employee', err);
        // optionally show a user-friendly error message
      },
      complete: () => {
        // you can also close modal here to guarantee it closes
        this.showFormModal = false;
        this.selectedEmployee = null;
      }

    });
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
      this.employeeService.deleteEmployee(this.employeeToDelete.id ?? '').subscribe({
        next: () => {
          // reload employees from API after deletion and close modal in success callback
          console.log("modal closing");
          this.showDeleteModal = false;
          this.employeeToDelete = null;
          this.loadEmployees();
          this.cdr.detectChanges();   // 🔹 force UI update
          console.log("employees reload");

        },
        error: (err) => {
          console.error('Error deleting employee', err);
        }
      });
    }
  }
}

