import { Injectable } from '@angular/core';
import { Employee } from '../models/employee.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiUrl = `${environment.apiUrl}/Employees`;
  constructor(private http: HttpClient) { }

  getEmployees(): Observable<Employee[]> {
    let token: string | null = '';
    if (typeof window !== 'undefined') {
      token = sessionStorage.getItem('token');
    }
    return this.http.get<Employee[]>(this.apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }

  saveEmployee(emp: Employee): Observable<Employee> {
    emp.employeeImage = 'assets/images/default-user.png';
    if (emp.id) {
      return this.http.put<Employee>(`${this.apiUrl}/${emp.id}`, emp);
    } else {
      return this.http.post<Employee>(this.apiUrl, emp);
    }
  }

  deleteEmployee(empId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${empId}`);
  }

  getEmployeebyId(id: string) {
    return this.http.get<Employee>(`${this.apiUrl}/${id}`);
  }
}
