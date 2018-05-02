import { Injectable } from '@angular/core';
import { Restangular } from 'ngx-restangular';
import { CoolLocalStorage } from 'angular2-cool-storage';
import { Identity } from '../models/identity';
import { IIdentity } from '../models/identity';
import { Message } from '../models/message';
import { IMessage } from '../models/message';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {
  store: CoolLocalStorage;
  identity: Identity;
  restangular: Restangular;
  constructor(localStorage: CoolLocalStorage ,restangular: Restangular) {
    this.store = localStorage;
    this.restangular = restangular;
   }
   setToken(_token: string){
     this.store.setItem('token',_token);
  }
   getToken(){
   return this.store.getItem('token');
  }
  setIndentity(_identity: Identity){
    this.store.setObject('identity',_identity);
   }
  getIndentity(){
    this.store.getObject('identity');
   }
  getRole(){
    this.identity = this.store.getObject('identity');
    return this.identity.role; 
  }
  getUserID(){
    this.identity = this.store.getObject('identity');
    return this.identity.userID;
  }

  getUserEmail(){
    this.identity = this.store.getObject('identity');
    return this.identity.userEmail;
  }
  
  getIsPasswordTemporary(){
    this.identity = this.store.getObject('identity');
    return this.identity.passwordTemporary;
  }
  //user and admin sign in
  signIn(options: any): Observable<Identity>{
    return this.restangular.all('api/auth/signin').post(options)
                                                  .map(response => {
                                                    return new Identity(response);
                                                  })
  }
  //user change password after loging in for the first time
  changePassword(options:any): Observable<Identity>{
    return this.restangular.all('api/auth/change-password').post(options)
                                                           .map(response => {
                                                            return new Identity(response);
                                                           })
  }
  //admin override password
  overridePassword(options:any): Observable<Message>{
    return this.restangular.all('api/auth/override-password').post(options)
                                                             .map(response => {
                                                              return new Message(response);
                                                            })   
  }
  //user password reset
  resetPassword(options: any): Observable<Identity>{
    return this.restangular.all('api/auth/reset-password').post(options)
                                                          .map(response => {
                                                            return new Identity(response);
                                                          })
  }
}
