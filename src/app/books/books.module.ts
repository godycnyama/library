import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersService } from '../customers/customers.service';

import { BooksRoutingModule } from './books-routing.module';
import { BusyModule } from 'angular2-busy';
import { SharedModule } from '../shared/shared.module';
import { CreateBookComponent } from './create-book/create-book.component';
import { BooksComponent } from './books/books.component';
import { UpdateBookComponent } from './update-book/update-book.component';
import { TdDataTableService } from '@covalent/core/data-table';
import { CovalentDialogsModule, TdDialogService, TdConfirmDialogComponent } from '@covalent/core/dialogs';
import { ToastrService } from 'ngx-toastr';
import { BooksService } from './books.service';
import { CreateLoanComponent } from './create-loan/create-loan.component';
import { UpdateLoanComponent } from './update-loan/update-loan.component';
import { LoansComponent } from './loans/loans.component';
import { ViewLoanComponent } from './view-loan/view-loan.component';

@NgModule({
  imports: [
    CommonModule,
    BooksRoutingModule,
    CovalentDialogsModule,
    BusyModule,
    SharedModule
  ],
  declarations: [CreateBookComponent, BooksComponent, UpdateBookComponent, CreateLoanComponent, UpdateLoanComponent, LoansComponent, ViewLoanComponent],
  providers: [BooksService,CustomersService,TdDataTableService,TdDialogService,ToastrService],
  entryComponents: []
})
export class BooksModule { }
