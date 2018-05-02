import { Injectable } from '@angular/core';
import { Restangular } from 'ngx-restangular';
import { CoolLocalStorage } from 'angular2-cool-storage';
import { IBook } from '../models/ibook';
import { ILoan } from '../models/iloan';
import { Message } from '../models/message';
import { IMessage } from '../models/message';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class BooksService {
  restangular: Restangular;
  books: IBook[] = [];
  customer: any;
  loan: ILoan;
  loans:ILoan[] = [];
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
  
   //create-book
  createBook(options: any){
    return this.restangular.all('api/books/create-book').post(options);                                             
  }
  //update-book
  updateBook(options: any){
    return this.restangular.all('api/books/update-book').put(options);                                               
  }
  //update-book
  deleteBook(option: any){
    return this.restangular.all('api/books/delete-book').customDELETE(option);
                                                  
  }

  //search for books in database
  searchBooks(options: any){
    return this.restangular.all('api/books').getList(options);
  }
  
  //search for book in database
  searchBook(option: any){
    return this.restangular.all('api/books').get(option);
  }

  //get books from array
  getBooks(){
    return this.books;
  }

  //get book from array
  getBook(id: any){
    for (var i = 0; i < this.books.length; i++) {
      if (this.books[i]._id == id) {
        return this.books[i];
      }
    }
    return;
  }

  //save books in array
  setBooks(_books:IBook[]){
    this.books = _books;
  }

  //remove book from array
  removeBook(id: any){
    for (var i = 0; i < this.books.length; i++) {
      if (this.books[i]._id == id) {
        this.books.splice(i, 1);
      }
   }
  return;
  }

   //create-loan
   createLoan(options: any){
    return this.restangular.all('api/books/create-loan').post(options);                                             
  }

  //update-loan
  updateLoan(options: any){
    return this.restangular.all('api/books/update-loan').put(options);                                               
  }
  
  //save loan in variable
  setLoan(_loan:ILoan){
    this.loan = _loan;
  }

  //get loan from variable
  getLoan(){
    return this.loan;
  }

  //delete-loan
  deleteLoan(option: any){
    return this.restangular.all('api/books/delete-loan').customDELETE(option);
                                                  
  }

  //save loans in array
  setLoans(_loans:ILoan[]){
    this.loans = _loans;
  }

  //get loans in array
  getLoans(){
    return this.loans;
  }

  //remove loan from array
  removeLoan(id: any){
    for (var i = 0; i < this.loans.length; i++) {
      if (this.loans[i]._id == id) {
        this.loans.splice(i, 1);
      }
   }
    return;
  }

  //save customer in variable
  setCustomer(_customer:any){
    this.customer = _customer;
  }

  //get customer from variable
  getCustomer(){
    return this.customer;
  }
}
