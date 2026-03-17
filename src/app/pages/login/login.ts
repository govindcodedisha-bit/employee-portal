import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { email } from '@angular/forms/signals';
import { Router } from '@angular/router';
import { AuthService } from '../../services/authservice';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})

export class Login {
  loginRequest = {
    email: '',
    password: ''
  }
  isLoading = signal(false);
  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) { }

  errorMessage = '';
  
 login() {

    this.errorMessage = '';
    this.isLoading.set(true);

    this.http.post<any>(`${environment.apiUrl}/auth/login`, this.loginRequest)
      .subscribe({
        next: (response) => {
          // store token
          this.authService.login(response.token);
          // redirect to home
          this.router.navigate(['/home']);
          console.log("login successfull.")
          this.isLoading.set(false);
        },

        error: (error) => {
          this.isLoading.set(false);
          if (error.status === 401) {
            this.errorMessage = 'Invalid email or password';
          } else {
            this.errorMessage = 'Something went wrong. Please try again.';
          }

        }

      });

  }
}
