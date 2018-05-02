import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup ,Validators } from "@angular/forms";
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { routerTransition } from '../../shared/animations/router.animations';
import { Identity } from '../../models/identity';
import { AuthService } from '../../auth/auth.service';
import { CustomValidators } from '../../shared/validators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [routerTransition()],
  host: {'[@routerTransition]': ''}
})
export class LoginComponent implements OnInit {
  formGroup: FormGroup;
  identity: Identity;
  busy: Subscription;
  constructor(private fb: FormBuilder,private authService :AuthService,
    private location: Location,private router: Router,private toastr: ToastrService) { }

  ngOnInit() {
    this.formGroup = this.fb.group({
      email: ['',[Validators.required,Validators.pattern('^.+@.+\..+$')]],
      password: ['',[Validators.required,Validators.pattern('/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,10}$/')]],
    })
  }
  login(){
    if(!this.formGroup.valid){
      this.toastr.error('Please fill all required fields to proceed!');
      return;
   }
   
   this.busy =  this.authService.changePassword(this.formGroup.value).subscribe(response => {
        // save the json token in local storage
        this.authService.setToken(response.token);
        this.authService.setIndentity(response);
        //if password is temporary redirect to change password form.
        if(response.passwordTemporary === true){
          this.toastr.success('Please change your password');
          this.router.navigate(['/change-password']);
        }
        this.toastr.success(response.message);
        this.router.navigate(['/']);
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
