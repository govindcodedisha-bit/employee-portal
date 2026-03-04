import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { About } from './pages/about/about';
import { Contact } from './pages/contact/contact';
import { EmployeeFormComponent } from './pages/employee-form/employee-form';
import { ReactiveEmployeeForm } from './pages/reactive-employee-form/reactive-employee-form';
import { EmployeeManagement } from './pages/employee-management/employee-management';
// import { Login } from './pages/login/login';
// import { Users } from './pages/users/users';
// import { NavTab } from './pages/nav-example/nav-tab/navng-tab';
// import { EmployeeListComponent } from './pages/employee-list/employee-list';

export const appRoutes: Routes = [
  { path: '', component: Home },
  { path: 'about', component: About },
  { path: 'contact', component: Contact },
  { path: 'employee-form', component: EmployeeFormComponent },
  { path: 'reactive-employee-form', component: ReactiveEmployeeForm },
  { path: 'employee-management', component: EmployeeManagement },
  //{ path: 'login', component: Login },
  //   { path: 'users', component: Users },
  //   { path: 'employees', component: EmployeeListComponent },
  //   { path: 'navtab', component: NavTab },
];