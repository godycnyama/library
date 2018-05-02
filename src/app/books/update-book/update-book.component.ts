import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup ,Validators } from "@angular/forms";
import { Location } from '@angular/common';
import { Router, ActivatedRoute ,ParamMap } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { routerTransition } from '../../shared/animations/router.animations';
import { IMessage } from '../../models/message';
import { IBook } from '../../models/ibook';
import { BooksService } from '../../books/books.service';
import { CustomValidators } from '../../shared/validators';

@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.css'],
  animations: [routerTransition()],
  host: {'[@routerTransition]': ''},
  viewProviders: [ BooksService ]
})
export class UpdateBookComponent implements OnInit{
  formGroup: FormGroup;
  busy: Subscription;
  categoryOptions: string[] = ['Science Fiction','Romance','Comedy','Thriller','Management','Engineering','Accounting','Law','Nursing','Social Sciences' ];
  constructor(private fb: FormBuilder,private location: Location,private route: ActivatedRoute,
    private toastr: ToastrService,private booksService: BooksService) { }

  ngOnInit() {
    this.formGroup = this.fb.group({
      title: ['',[Validators.required,Validators.maxLength(50)]],
      isbn: ['',[Validators.required,Validators.maxLength(50)]],
      category: ['',[Validators.required,Validators.maxLength(50)]],
      authors: ['',[Validators.required,Validators.maxLength(150)]],
      publisher: ['',[Validators.required,Validators.maxLength(50)]],
      year_published: ['',[Validators.required,Validators.maxLength(50)]]  
    })

    this.route.paramMap.subscribe(params => {
      let book = this.booksService.getBook(+params.get('id'));
      this.formGroup.patchValue({
        title: book.title,
        isbn: book.isbn,
        category: book.category,
        authors: book.authors,
        publisher: book.publisher,
        year_published: book.year_published
      });
    })
  }

    updateBook(){
      if(!this.formGroup.valid){
        this.toastr.error('Please fill all required fields to proceed!');
        return;
     }
     
     this.busy =  this.booksService.updateBook(this.formGroup.value).subscribe((response:IMessage) => {
          this.toastr.success(response.message);
          this.location.back();
      },err => {
      this.toastr.error(err.message);
      })
    }
    back(){
      this.location.back();
    }
  
  
}
  
 
