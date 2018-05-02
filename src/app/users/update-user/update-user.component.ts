import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup ,Validators } from "@angular/forms";
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { IMessage } from '../../models/message';
import { IError } from '../../models/ierror';
import { IUser } from '../../models/iuser';
import { UsersService } from '../../users/users.service';
import { CustomValidators } from '../../shared/validators';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
  formGroup: FormGroup;
  busy: Subscription;
  genderOptions: string[] = ['Male','Female'];
  data = {
    firstName: '',
    lastName: '',
    gender: '',
    jobTitle: '',
    address: '',
    tel: '',
    mobile: '',
    email: '',
    password: ''
  };
  constructor(private fb: FormBuilder,private location: Location,private router: Router,private route: ActivatedRoute,
    private toastr: ToastrService,private usersService: UsersService) { }

  ngOnInit() {
    this.formGroup = this.fb.group({
      firstName: ['',[Validators.required,Validators.maxLength(50)]],
      lastName: ['',[Validators.required,Validators.maxLength(50)]],
      gender: ['',[Validators.required,Validators.maxLength(50)]],
      jobTitle: ['',[Validators.required,Validators.maxLength(50)]],
      tel: ['',[Validators.required,Validators.maxLength(50)]],
      mobile: ['',[Validators.required,Validators.maxLength(50)]],
      address: ['',[Validators.required,Validators.maxLength(150)]],
      email: ['',[Validators.required,Validators.pattern('^.+@.+\..+$')]],
      password: ['',[Validators.required,Validators.pattern('/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,10}$/')]],
      confirmPassword: ['',[Validators.required]], 
    },{ validator: CustomValidators.Match('password','confirmPassword')});

    this.route.paramMap.subscribe(params => {
      let user = this.usersService.getUser(+params.get('id'));
      this.formGroup.patchValue({
        firstName: user.firstName,
        lastName: user.lastName,
        gender: user.gender,
        jobTitle: user.jobTitle,
        tel: user.tel,
        mobile: user.mobile,
        email: user.email,
        address: user.address
      });
    })
  }
  updateBook(){
    if(!this.formGroup.valid){
      this.toastr.error('Please fill all required fields to proceed!');
      return;
   }
   this.data.firstName = this.formGroup.controls.firstName.value;
   this.data.lastName = this.formGroup.controls.lastName.value;
   this.data.gender = this.formGroup.controls.gender.value;
   this.data.jobTitle = this.formGroup.controls.jobTitle.value;
   this.data.address = this.formGroup.controls.address.value;
   this.data.tel = this.formGroup.controls.tel.value;
   this.data.email = this.formGroup.controls.email.value;
   this.data.password = this.formGroup.controls.password.value;
   this.busy =  this.usersService.updateUser(this.data).subscribe((response:IMessage) => {
        this.toastr.success(response.message);
        this.router.navigate(['/users']);
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
