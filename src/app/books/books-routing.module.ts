import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateBookComponent } from './create-book/create-book.component';
import { BooksComponent } from './books/books.component';
import { UpdateBookComponent } from './update-book/update-book.component';
import { CreateLoanComponent } from './create-loan/create-loan.component';
import { UpdateLoanComponent } from './update-loan/update-loan.component';
import { LoansComponent } from './loans/loans.component';
import { ViewLoanComponent } from './view-loan/view-loan.component';

const routes: Routes = [
  { path: '', component: BooksComponent },
  { path: 'create-book', component: CreateBookComponent },
  { path: 'update-book/:id', component: UpdateBookComponent },
  { path: 'create-loan', component: CreateLoanComponent },
  { path: 'view-loan', component: ViewLoanComponent },
  { path: 'update-loan/:id', component: UpdateLoanComponent },
  { path: 'loans', component: LoansComponent }]
  

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BooksRoutingModule { }
