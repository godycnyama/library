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
import { IUser } from '../../models/iuser';
import { UsersService } from '../../users/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  animations: [routerTransition()],
  host: {'[@routerTransition]': ''}
})
export class UsersComponent implements OnInit {
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
  users: IUser[] = []; 
  
  filteredData: any[] = this.users;
  filteredTotal: number = this.users.length;
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
    private _viewContainerRef: ViewContainerRef,private _usersService: UsersService ,private toastr: ToastrService) { }

  ngOnInit() {
    this.formGroup = this.fb.group({
      searchBy: ['All',[Validators.required]],
      searchTerm: [''],
      pageSize: ['',[Validators.required]],
    })
    this.formGroup.patchValue({
      searchBy: this._usersService.getSearchBy(),
      searchTerm: this._usersService.getSearchTerm(),
      pageSize: this._usersService.getPageSize()
    })
    this.currentPage = this._usersService.getCurrentPage();
  }

  delete(user: IUser): void {
    this._dialogService.openConfirm({
      message: 'Are you sure you want to delete user?',
      viewContainerRef: this._viewContainerRef, //OPTIONAL
      title: 'Confirm', //OPTIONAL, hides if not provided
      cancelButton: 'Cancel', //OPTIONAL, defaults to 'CANCEL'
      acceptButton: 'Delete' //OPTIONAL, defaults to 'ACCEPT'
    }).afterClosed().subscribe((accept: boolean) => {
      if (accept) {
        this.busy = this._usersService.deleteUser(user._id).subscribe((response: IMessage) =>{
          this.toastr.error(response.message);
          this._usersService.removeUser(user._id);
         },(err: IError ) => {
          this.toastr.error(err.message);
         }
        )
      } else {
          return;
      }
    });
  }
}
