import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../shared/animations/router.animations';
import { FormBuilder, FormGroup ,Validators } from "@angular/forms";
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { IMessage } from '../../models/message';
import { IError } from '../../models/ierror';
import { IUser } from '../../models/iuser';
import { CustomersService } from '../../customers/customers.service';
import { CustomValidators } from '../../shared/validators';


@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css'],
  animations: [routerTransition()],
  host: {'[@routerTransition]': ''}
})
export class CreateCustomerComponent implements OnInit {
  formGroup: FormGroup;
  busy: Subscription;
  genderOptions: string[] = ['Male','Female'];
  constructor(private fb: FormBuilder,private location: Location,private router: Router,
    private toastr: ToastrService,private customersService: CustomersService) { }

  ngOnInit() {
    this.formGroup = this.fb.group({
      firstName: ['',[Validators.required,Validators.maxLength(50)]],
      lastName: ['',[Validators.required,Validators.maxLength(50)]],
      gender: ['',[Validators.required,Validators.maxLength(50)]],
      tel: ['',[Validators.required,Validators.maxLength(50)]],
      mobile: ['',[Validators.required,Validators.maxLength(50)]],
      email: ['',[Validators.required,Validators.pattern('^.+@.+\..+$')]],
      address: ['',[Validators.required,Validators.maxLength(150)]], 
    })
  }

  createCustomer(){
    if(!this.formGroup.valid){
      this.toastr.error('Please fill all required fields to proceed!');
      return;
   }
   this.busy = this.customersService.createCustomer(this.formGroup.value).subscribe((response: IMessage) => {
    this.toastr.success(response.message);
    this.router.navigate(['/customers']);
   },(err: IError) => {
    this.toastr.error(err.message);
   })
  }

  back(){
    this.location.back();
  }

}
