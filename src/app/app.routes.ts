import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { About } from './pages/about/about';
import { Contact } from './pages/contact/contact';
import { EmployeeFormComponent } from './pages/employee-form/employee-form';
import { ReactiveEmployeeForm } from './pages/reactive-employee-form/reactive-employee-form';
import { EmployeeManagement } from './pages/employee-management/employee-management';
import { Counter } from './pages/counter/counter';
import { Login } from './pages/login/login';
import { authGuard } from './guard/auth-guard';
import { roleGuard } from './guard/role-guard';
import { Role } from './models/role.enum';
import { Unauthorized } from './pages/unauthorized/unauthorized';
// import { Login } from './pages/login/login';
// import { Users } from './pages/users/users';
// import { NavTab } from './pages/nav-example/nav-tab/navng-tab';
// import { EmployeeListComponent } from './pages/employee-list/employee-list';

export const appRoutes: Routes = [
  { path: 'login', component: Login },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: Home, canActivate: [authGuard] },
  { path: 'about', component: About },
  { path: 'contact', component: Contact },
  { path: 'employee-form', component: EmployeeFormComponent },
  { path: 'reactive-employee-form', component: ReactiveEmployeeForm, canActivate: [authGuard] },
  { path: 'employee-management', component: EmployeeManagement, canActivate: [authGuard, roleGuard],
     data: { roles: [Role.SystemAdmin, Role.HRAdmin, Role.HR] } },
  { path: 'counter', component: Counter },
  { path: 'unauthorized', component: Unauthorized },
  
];