import { Component, OnInit } from '@angular/core';
import { BooksService } from '../../books/books.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-loan',
  templateUrl: './view-loan.component.html',
  styleUrls: ['./view-loan.component.css']
})
export class ViewLoanComponent implements OnInit {
  loan: any;
  constructor(private _booksService: BooksService, private _router: Router) { }

  ngOnInit() {
    this.loan = this._booksService.getLoan();
  }

  loanMore(){
    this._router.navigate(['books']); //go back to books
  }

  bookLoans(){
    this._router.navigate(['books/loans']); // go to book loans
  }
}
