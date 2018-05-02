import { Injectable } from '@angular/core';
import { Restangular } from 'ngx-restangular';
import { IUser } from '../models/iuser';


@Injectable()
export class UsersService {
  restangular: Restangular;
  users: IUser[] = [];
  searchBy: string = 'All';
  searchTerm: string = '';
  pageSize: number = 5;
  totalItems: number = 0;
  currentPage: number = 1;
  constructor(restangular: Restangular) {
    this.restangular = restangular;
   }
  
  setPageSize(_size: number){
    this.pageSize = _size;
    return;
  }
  getPageSize(){
    return this.pageSize;
  }
  setSearchBy(_searchBy: string){
      this.searchBy = _searchBy;
      return;
  }
  getSearchBy(){
    return this.searchBy;
  }
  setSearchTerm(_term: string){
    this.searchTerm = _term;
    return;
  }
  getSearchTerm(){
    return this.searchTerm;
  }
  setCurrentPage(_page: number){
    this.currentPage = _page;
    return;
  }
  getCurrentPage(){
    return this.currentPage;
  }
  setTotalItems(_total: number){
    this.totalItems = _total;
  }
  getTotalItems(){
    return this.totalItems;
  }
   //create-user
  createUser(options: any){
    return this.restangular.all('api/users/create-user').post(options);                                             
  }
  //update-user
  updateUser(options: any){
    return this.restangular.all('api/users/update-user').put(options);
                                                  
  }
  //delete-user
  deleteUser(option: any){
    return this.restangular.all('api/users/delete-user').customDELETE(option);
                                                  
  }
  //search for users using query parameters
  searchUsers(options: any){
    return this.restangular.all('api/users').getList(options);
  }
  //search for user
  searchUser(option: any){
    return this.restangular.all('api/users').get(option);
  }
  //get users from array
  getUsers(){
    return this.users;
  }
  //save users in array
  setUsers(_users:IUser[]){
    this.users = _users;
  }
  //get user from array
  getUser(id: any){
    for (var i = 0; i < this.users.length; i++) {
      if (this.users[i]._id == id) {
        return this.users[i];
      }
    }
    return;
  }
  //remove user from array
  removeUser(id: any){
    for (var i = 0; i < this.users.length; i++) {
      if (this.users[i]._id == id) {
        this.users.splice(i, 1);
      }
   }
  return;
  }

}
