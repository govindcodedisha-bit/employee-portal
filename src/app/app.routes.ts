import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { About } from './pages/about/about';
import { Contact } from './pages/contact/contact';
import { EmployeeForm } from './pages/employee-form/employee-form';
import { ReactiveEmployeeForm } from './pages/reactive-employee-form/reactive-employee-form';
// import { Login } from './pages/login/login';
// import { Users } from './pages/users/users';
// import { NavTab } from './pages/nav-example/nav-tab/navng-tab';
// import { EmployeeListComponent } from './pages/employee-list/employee-list';

export const appRoutes: Routes = [
  { path: '', component: Home },
  { path: 'about', component: About },
  { path: 'contact', component: Contact },
  { path: 'employee-form', component: EmployeeForm },
  { path: 'reactive-employee-form', component: ReactiveEmployeeForm },
  //{ path: 'login', component: Login },
  //   { path: 'users', component: Users },
  //   { path: 'employees', component: EmployeeListComponent },
  //   { path: 'navtab', component: NavTab },
];