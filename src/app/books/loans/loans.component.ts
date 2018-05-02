import { Component, OnInit ,ViewContainerRef} from '@angular/core';
import { FormBuilder, FormGroup ,Validators } from "@angular/forms";
import { TdDataTableService, TdDataTableSortingOrder, ITdDataTableSortChangeEvent, ITdDataTableColumn } from '@covalent/core/data-table';
import { IPageChangeEvent } from '@covalent/core/paging';
import { TdDialogService } from '@covalent/core/dialogs';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { routerTransition } from '../../shared/animations/router.animations';
import { IMessage } from '../../models/message';
import { IError } from '../../models/ierror';
import { ILoan } from '../../models/iloan';
import { BooksService } from '../../books/books.service';

@Component({
  selector: 'app-loans',
  templateUrl: './loans.component.html',
  styleUrls: ['./loans.component.css'],
  animations: [routerTransition()],
  host: {'[@routerTransition]': ''}
})
export class LoansComponent implements OnInit {
  formGroup: FormGroup;
  columns: ITdDataTableColumn[] = [
    { name: 'id',  label: 'Id' },
    { name: 'isbn', label: 'Isbn' },
    { name: 'title', label: 'Title' },
    { name: 'loaned_date', label: 'Loaned Date' },
    { name: 'due_date', label: 'Due Date' },
    { name: 'returned_date', label: 'Returned Date' },
    { name: 'firstName', label: 'First Name'},
    { name: 'lastName', label: 'Last Name'},
    { name: 'status', label: 'Status'},
  ];
  busy: Subscription;
  loans: ILoan[] = []; 
  
  filteredData: any[] = this.loans;
  filteredTotal: number = this.loans.length;
  pageSizeOptions: number[] = [5,10,20,50,100,200,500];
  searchByOptions: string[] = ['All','ISBN','ID','Category','Title','Out','In'];
  fromRow: number = 1;
  currentPage: number;
  sortOrder: TdDataTableSortingOrder = TdDataTableSortingOrder.Descending;
  searchQuery = {
    searchBy: null,
    searchTerm: null,
    pageSize: null,
    currentPage: null
  };
  constructor(private fb: FormBuilder, private _dataTableService: TdDataTableService, private _dialogService: TdDialogService,
    private _viewContainerRef: ViewContainerRef,private _booksService: BooksService ,private toastr: ToastrService) { }

  ngOnInit() {
    this.formGroup = this.fb.group({
      searchBy: ['All',[Validators.required]],
      searchTerm: [''],
      pageSize: ['',[Validators.required]],
    })
    this.formGroup.patchValue({
      searchBy: this._booksService.getSearchBy(),
      searchTerm: this._booksService.getSearchTerm(),
      pageSize: this._booksService.getPageSize()
    })
    this.currentPage = this._booksService.getCurrentPage();
    this.loans = this._booksService.getLoans();
  }

  delete(_loan: ILoan): void {
    this._dialogService.openConfirm({
      message: 'Are you sure you want to delete loan?',
      disableClose: true, // defaults to false
      viewContainerRef: this._viewContainerRef, //OPTIONAL
      title: 'Confirm', //OPTIONAL, hides if not provided
      cancelButton: 'Cancel', //OPTIONAL, defaults to 'CANCEL'
      acceptButton: 'Delete', //OPTIONAL, defaults to 'ACCEPT'
      width: '500px', //OPTIONAL, defaults to 400px
    }).afterClosed().subscribe((accept: boolean) => {
      if (accept) {
        this.busy = this._booksService.deleteLoan(_loan._id).subscribe((response: IMessage) =>{
          this.toastr.error(response.message);
          this._booksService.removeBook(_loan._id);
         },(err: IError ) => {
          this.toastr.error(err.message);
         }
        )
      } else {
          return;
      }
    });
  }

  openDialog(){
    this._dialogService.openConfirm({
      message: 'Are you sure you want to delete loan?',
      viewContainerRef: this._viewContainerRef,
      title: 'Confirm', //OPTIONAL, hides if not provided
      cancelButton: 'Cancel', //OPTIONAL, defaults to 'CANCEL'
      acceptButton: 'Delete', //OPTIONAL, defaults to 'ACCEPT'
    }).afterClosed().subscribe((accept: boolean) => {
      if (accept) {
        return;
      } else {
          return;
      }
    });
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
    this.busy = this._booksService.searchBooks(this.searchQuery).subscribe((response: ILoan[]) => {
      this.loans = response;
      this._booksService.setLoans(response);
    },(err: IError) => {
      this.toastr.error(err.message);
    })

  }

  page(pagingEvent: IPageChangeEvent): void {
    this.fromRow = pagingEvent.fromRow;
    this.currentPage = pagingEvent.page;
    this.search();
  }

}
