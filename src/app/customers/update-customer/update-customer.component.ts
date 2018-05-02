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
  selector: 'app-update-customer',
  templateUrl: './update-customer.component.html',
  styleUrls: ['./update-customer.component.css'],
  animations: [routerTransition()],
  host: {'[@routerTransition]': ''},
  viewProviders: [ CustomersService ]
})
export class UpdateCustomerComponent implements OnInit {
  formGroup: FormGroup;
  busy: Subscription;
  genderOptions: string[] = ['Male','Female'];
  constructor(private fb: FormBuilder,private location: Location,private router: Router,private route: ActivatedRoute,
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
    this.route.paramMap.subscribe(params => {
      let customer = this.customersService.getCustomer(+params.get('id'));
      this.formGroup.patchValue({
        firstName: customer.firstName,
        lastName: customer.lastName,
        gender: customer.gender,
        tel: customer.tel,
        mobile: customer.mobile,
        email: customer.email,
        address: customer.address
      });
    })
  }
  updateBook(){
    if(!this.formGroup.valid){
      this.toastr.error('Please fill all required fields to proceed!');
      return;
   }
   
   this.busy =  this.customersService.updateCustomer(this.formGroup.value).subscribe((response:IMessage) => {
        this.toastr.success(response.message);
        this.location.back();
    },(err: IError) => {
    this.toastr.error(err.message);
    })
  }

  back(){
    this.location.back();
  }

}
