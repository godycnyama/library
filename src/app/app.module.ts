import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { BusyModule } from 'angular2-busy';
import { CoolStorageModule, CoolLocalStorage } from 'angular2-cool-storage';
import { RestangularModule,Restangular } from 'ngx-restangular';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { TdMediaService } from '@covalent/core/media';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SharedModule } from './shared/shared.module';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthModule } from './auth/auth/auth.module';
import { _LoginComponent } from './auth/auth/auth.module';
import { _ChangePasswordComponent } from './auth/auth/auth.module';
import { _ResetPasswordComponent } from './auth/auth/auth.module';
import { _OverridePasswordComponent } from './auth/auth/auth.module';

export function RestangularConfigFactory(RestangularProvider){
  RestangularProvider.setBaseUrl('http://localhost:4200');
  RestangularProvider.setFullResponse(true);
  RestangularProvider.setRestangularFields({
    id: "_id"
  })
}


export function authHttpServiceFactory(http: Http, options: RequestOptions){
  return new AuthHttp(new AuthConfig(), http, options);
}

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    _LoginComponent,
    _ChangePasswordComponent,
    _ResetPasswordComponent,
    _OverridePasswordComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RestangularModule.forRoot(RestangularConfigFactory),
    ToastrModule.forRoot({positionClass:'toast-top-center',preventDuplicates:true}),
    BusyModule,
    CoolStorageModule,
    AuthModule,
    MatSidenavModule,
    SharedModule,
  ],
  providers: [TdMediaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
