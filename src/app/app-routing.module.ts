import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { _LoginComponent } from './auth/auth/auth.module';
import { _ChangePasswordComponent } from './auth/auth/auth.module';
import { _ResetPasswordComponent } from './auth/auth/auth.module';
import { _OverridePasswordComponent } from './auth/auth/auth.module';


const routes: Routes = [
  { path: '', redirectTo: 'books', pathMatch: 'full' },
  { path: 'login', component: _LoginComponent },
  { path: 'change-password', component: _ChangePasswordComponent },
  { path: 'reset-password', component: _ResetPasswordComponent },
  { path: 'override-password', component: _OverridePasswordComponent }, // for admin role
  { path: 'books', loadChildren: 'app/books/books.module#BooksModule' },
  { path: 'customers', loadChildren: 'app/customers/customers.module#CustomersModule' },
  { path: 'users', loadChildren: 'app/users/users.module#UsersModule' }];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

