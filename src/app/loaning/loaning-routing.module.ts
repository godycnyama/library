import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoansComponent } from './loans/loans.component';
import { IssueComponent } from './issue/issue.component';
import { ReturnComponent } from './return/return.component';
import { LoaningService } from './loaning.service';
import { CreateLoanComponent } from './create-loan/create-loan.component';
import { UpdateLoanComponent } from './update-loan/update-loan.component';

const routes: Routes = [
  { path: '', component: LoansComponent },
  { path: 'create-loan', component: CreateLoanComponent },
  { path: 'update-loan', component: UpdateLoanComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoaningRoutingModule { }
