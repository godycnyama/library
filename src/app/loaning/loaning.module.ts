import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusyModule } from 'angular2-busy';
import { TdDataTableService } from '@covalent/core/data-table';
import { CovalentDialogsModule, TdDialogService, TdConfirmDialogComponent } from '@covalent/core/dialogs';
import { ToastrService } from 'ngx-toastr';
import { LoaningRoutingModule } from './loaning-routing.module';
import { SharedModule } from '../shared/shared.module';
import { LoansComponent } from './loans/loans.component';
import { IssueComponent } from './issue/issue.component';
import { ReturnComponent } from './return/return.component';
import { LoaningService } from './loaning.service';
import { CreateLoanComponent } from './create-loan/create-loan.component';
import { UpdateLoanComponent } from './update-loan/update-loan.component';

@NgModule({
  imports: [
    CommonModule,
    BusyModule,
    LoaningRoutingModule,
    SharedModule
  ],
  declarations: [LoansComponent, IssueComponent, ReturnComponent, CreateLoanComponent, UpdateLoanComponent],
  providers: [LoaningService,TdDataTableService,TdDialogService,ToastrService]
})
export class LoaningModule { }
