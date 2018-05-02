import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';
import { OverridePasswordComponent } from '../override-password/override-password.component';
import { CoolLocalStorage } from 'angular2-cool-storage';
import { AuthService } from '../../auth/auth.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [AuthService,CoolLocalStorage],
})
export class AuthModule { }
export const _LoginComponent: any = LoginComponent;
export const _ChangePasswordComponent: any = ChangePasswordComponent;
export const _ResetPasswordComponent: any = ResetPasswordComponent;
export const _OverridePasswordComponent: any = OverridePasswordComponent;