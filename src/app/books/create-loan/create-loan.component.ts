import { Component, OnInit ,ViewContainerRef} from '@angular/core';
import { FormBuilder, FormGroup ,Validators } from "@angular/forms";
import { Location } from '@angular/common';
import { Router, ActivatedRoute ,ParamMap } from '@angular/router';
import { TdDataTableService, TdDataTableSortingOrder, ITdDataTableSortChangeEvent, ITdDataTableColumn } from '@covalent/core/data-table';
import { IPageChangeEvent } from '@covalent/core/paging';
import { TdDialogService } from '@covalent/core/dialogs';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { routerTransition } from '../../shared/animations/router.animations';
import { IMessage } from '../../models/message';
import { IError } from '../../models/ierror';
import { IBook } from '../../models/ibook';
import { ILoan } from '../../models/iloan';
import { ICustomer } from '../../models/icustomer';
import { BooksService } from '../../books/books.service';
import { CustomersService } from '../../customers/customers.service';

@Component({
  selector: 'app-create-loan',
  templateUrl: './create-loan.component.html',
  styleUrls: ['./create-loan.component.css'],
  animations: [routerTransition()],
  host: {'[@routerTransition]': ''}
})
export class CreateLoanComponent implements OnInit {
  formGroup: FormGroup;
  columns: ITdDataTableColumn[] = [
    { name: '_id',  label: 'Id' },
    { name: 'firstName', label: 'First Name' },
    { name: 'lastName', label: 'Last Name' }  
  ];
  busy: Subscription;
  book: IBook;
  loan: ILoan;
  customer: ICustomer;
  customers: ICustomer[] = []; 
  loan_data = {
    bookID: null,
    isbn: null,
    title: null,
    customerID: null,
    firstName: null,
    lastName: null
  }
  
  filteredData: any[] = this.customers;
  filteredTotal: number = this.customers.length;
  pageSizeOptions: number[] = [5,10,20,50,100,200,500];
  searchByOptions: string[] = ['First Name','Last Name','ID'];
  fromRow: number = 1;
  currentPage: number;
  sortOrder: TdDataTableSortingOrder = TdDataTableSortingOrder.Descending;
  searchQuery = {
    searchBy: null,
    searchTerm: null,
    pageSize: null,
    currentPage: null
  };

  constructor(private fb: FormBuilder, private _dataTableService: TdDataTableService, private location: Location,private router: Router,
    private route: ActivatedRoute,private _customersService: CustomersService,private _booksService: BooksService ,private toastr: ToastrService) { }

  ngOnInit() {

    this.formGroup = this.fb.group({
      searchBy: ['All',[Validators.required]],
      searchTerm: [''],
      pageSize: ['',[Validators.required]],
    })
    this.route.paramMap.subscribe(params => {
      this.book = this._booksService.getBook(+params.get('id'));
    })
    this.customer = this._booksService.getCustomer();
  }

  search(): void {
    if(this.formGroup.controls.searchBy.value != 'All' && this.formGroup.controls.searchTerm.value == ''){
      this.toastr.error('Please enter search term to proceed!');
      return;
    }
    this.searchQuery.searchBy = this.formGroup.controls.searchBy.value;
    this.searchQuery.searchTerm = this.formGroup.controls.searchTerm.value;
    this.searchQuery.pageSize = this.formGroup.controls.pageSize.value;
    this.searchQuery.currentPage = this.currentPage;
    this.busy = this._customersService.searchCustomers(this.searchQuery).subscribe((response: ICustomer[]) => {
      this.customers = response;
      this._customersService.setCustomers(response);
    },(err: IError) => {
      this.toastr.error(err.message);
    })

  }

  select(_customer: ICustomer){
    this.customer = _customer;
  }
  createLoan(){
    this.loan_data.bookID = this.book._id;
    this.loan_data.isbn = this.book.isbn;
    this.loan_data.title = this.book.title;
    this.loan_data.customerID = this.customer._id;
    this.loan_data.firstName = this.customer.firstName;
    this.loan_data.lastName = this.customer.lastName;
    this.busy = this._booksService.createLoan(this.loan_data).subscribe((_loan:ILoan) => {
      this.toastr.success('Book loaned successfully!');
      this._booksService.setLoan(_loan);
      this.router.navigate(['/books/view-loan']);
    },(err:IError) => {
      this.toastr.error(err.message);
    })
  }
  page(pagingEvent: IPageChangeEvent): void {
    this.fromRow = pagingEvent.fromRow;
    this.currentPage = pagingEvent.page;
    this.search();
  }

}
