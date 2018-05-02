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
import { ICustomer } from '../../models/icustomer';
import { CustomersService } from '../../customers/customers.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],
  animations: [routerTransition()],
  host: {'[@routerTransition]': ''}
})
export class CustomersComponent implements OnInit {
  formGroup: FormGroup;
  columns: ITdDataTableColumn[] = [
    { name: '_id',  label: 'Id' },
    { name: 'firstName', label: 'First Name' },
    { name: 'lastName', label: 'Last Name' },
    { name: 'gender', label: 'Gender' },
    { name: 'tel', label: 'Tel'},
    { name: 'mobile', label: 'Mobile'},
    { name: 'email', label: 'Email'},
    { name: 'address', label: 'Address'},
  ];
  busy: Subscription;
  customers: ICustomer[] = []; 
  
  filteredData: any[] = this.customers;
  filteredTotal: number = this.customers.length;
  pageSizeOptions: number[] = [5,10,20,50,100,200,500];
  searchByOptions: string[] = ['All','First Name','Last Name','ID'];
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
    private _viewContainerRef: ViewContainerRef,private _customersService: CustomersService ,private toastr: ToastrService) { }

  ngOnInit() {
    this.formGroup = this.fb.group({
      searchBy: ['All',[Validators.required]],
      searchTerm: [''],
      pageSize: ['',[Validators.required]],
    })
    this.formGroup.patchValue({
      searchBy: this._customersService.getSearchBy(),
      searchTerm: this._customersService.getSearchTerm(),
      pageSize: this._customersService.getPageSize()
    })
    this.currentPage = this._customersService.getCurrentPage();
  }

  delete(customer: ICustomer): void {
    this._dialogService.openConfirm({
      message: 'Are you sure you want to delete customer?',
      viewContainerRef: this._viewContainerRef, //OPTIONAL
      title: 'Confirm', //OPTIONAL, hides if not provided
      cancelButton: 'Cancel', //OPTIONAL, defaults to 'CANCEL'
      acceptButton: 'Delete' //OPTIONAL, defaults to 'ACCEPT'
    }).afterClosed().subscribe((accept: boolean) => {
      if (accept) {
        this.busy = this._customersService.deleteCustomer(customer._id).subscribe((response: IMessage) =>{
          this.toastr.error(response.message);
          this._customersService.removeCustomer(customer._id);
         },(err: IError ) => {
          this.toastr.error(err.message);
         }
        )
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
    this.busy = this._customersService.searchCustomers(this.searchQuery).subscribe((response: ICustomer[]) => {
      this.customers = response;
      this._customersService.setCustomers(response);
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
