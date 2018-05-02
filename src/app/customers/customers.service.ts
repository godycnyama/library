import { Injectable } from '@angular/core';
import { Restangular } from 'ngx-restangular';
import { ICustomer } from '../models/icustomer';


@Injectable()
export class CustomersService {
  restangular: Restangular;
  customers: ICustomer[] = [];
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
   //create-customer
  createCustomer(options: any){
    return this.restangular.all('api/customers/create-customer').post(options);                                             
  }
  //update-customer
  updateCustomer(options: any){
    return this.restangular.all('api/customers/update-customer').put(options);
                                                  
  }
  //delete-customer
  deleteCustomer(option: any){
    return this.restangular.all('api/customers/delete-customer').customDELETE(option);
                                                  
  }
  //search for customers using query parameters
  searchCustomers(options: any){
    return this.restangular.all('api/customers').getList(options);
  }
  //seacrh for customer
  searchCustomer(option: any){
    return this.restangular.all('api/customers').get(option);
  }
  getCustomers(){
    return this.customers;
  }
  setCustomers(_customers:ICustomer[]){
    this.customers = _customers;
  }
  getCustomer(id: any){
    for (var i = 0; i < this.customers.length; i++) {
      if (this.customers[i]._id == id) {
        return this.customers[i];
      }
    }
    return;
  }
  removeCustomer(id: any){
    for (var i = 0; i < this.customers.length; i++) {
      if (this.customers[i]._id == id) {
        this.customers.splice(i, 1);
      }
   }
  return;
  }


}
