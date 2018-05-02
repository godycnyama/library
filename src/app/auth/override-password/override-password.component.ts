import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup ,Validators } from "@angular/forms";
import { Location } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { routerTransition } from '../../shared/animations/router.animations';
import { Identity } from '../../models/identity';
import { AuthService } from '../../auth/auth.service';
import { CustomValidators } from '../../shared/validators';

@Component({
  selector: 'app-override-password',
  templateUrl: './override-password.component.html',
  styleUrls: ['./override-password.component.css'],
  animations: [routerTransition()],
  host: {'[@routerTransition]': ''}
})
export class OverridePasswordComponent implements OnInit {
  formGroup: FormGroup;
  identity: Identity;
  busy: Subscription;
  data = {
    email: '',
    password: ''
  };
  constructor(private fb: FormBuilder,private authService :AuthService,
    private location: Location,private toastr: ToastrService) { }

  ngOnInit() {
    this.formGroup = this.fb.group({
      email: ['',[Validators.required,Validators.pattern('^.+@.+\..+$')]],
      oldPassword: ['',[Validators.required,Validators.pattern('/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,10}$/')]],
      newPassword: ['',[Validators.required,Validators.pattern('/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,10}$/')]],
      confirmNewPassword: ['',[Validators.required]],
      securityQuestion: ['',[Validators.required]],
      securityQuestionAnswer: ['',[Validators.required,Validators.maxLength(150)]],
    },{ validator: CustomValidators.Match('newPassword','confirmNewPassword')})
  }
  overridePassword(){
    if(!this.formGroup.valid){
      this.toastr.error('Please fill all required fields to proceed!');
      return;
    }
   this.data.email = this.formGroup.controls.email.value;
   this.data.password = this.formGroup.controls.newPassword.value;
   this.busy =  this.authService.overridePassword(this.data).subscribe(response => {
        this.toastr.success(response.message);
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
