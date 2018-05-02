import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup ,Validators } from "@angular/forms";
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { routerTransition } from '../../shared/animations/router.animations';
import { IMessage } from '../../models/message';
import { IError } from '../../models/ierror';
import { IBook } from '../../models/ibook';
import { BooksService } from '../../books/books.service';
import { CustomValidators } from '../../shared/validators';

@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.css'],
  animations: [routerTransition()],
  host: {'[@routerTransition]': ''}
})
export class CreateBookComponent implements OnInit {
  formGroup: FormGroup;
  busy: Subscription;
  categoryOptions: string[] = ['Science Fiction','Romance','Comedy','Thriller','Management','Engineering','Accounting','Law','Nursing','Social Sciences' ];
  constructor(private fb: FormBuilder,private location: Location,private router: Router,
    private toastr: ToastrService,private booksService: BooksService) { }

  ngOnInit() {
    this.formGroup = this.fb.group({
      title: ['',[Validators.required,Validators.maxLength(50)]],
      isbn: ['',[Validators.required,Validators.maxLength(50)]],
      category: ['',[Validators.required,Validators.maxLength(50)]],
      authors: ['',[Validators.required,Validators.maxLength(150)]],
      publisher: ['',[Validators.required,Validators.maxLength(50)]]  
    })
  }
  createBook(){
    if(!this.formGroup.valid){
      this.toastr.error('Please fill all required fields to proceed!');
      return;
   }
   
   this.busy =  this.booksService.createBook(this.formGroup.value).subscribe((response:IMessage) => {
        this.toastr.success(response.message);
        this.router.navigate(['/books']);
    },err => {
    this.toastr.error(err.message);
    })
  }
  message(){
    this.toastr.error('Please fill all required fields to proceed!');
  }
  back(){
    this.location.back();
  }
}
