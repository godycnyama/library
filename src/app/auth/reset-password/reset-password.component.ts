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
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
  animations: [routerTransition()],
  host: {'[@routerTransition]': ''}
})
export class ResetPasswordComponent implements OnInit {
  formGroup: FormGroup;
  identity: Identity;
  busy: Subscription;
  questionOptions: string[] = ['What is the name of your first grade teacher?', 'What is the name of your first school?',
  'What is your dream job?', 'What was your first car?', 'What is the maiden name of your mother?',
  'What was your favourate place to visit as a child?', 'Where did you meet your spouse?'];
  data = {
    email: '',
    password: '',
    securityQuestion: '',
    securityQuestionAnswer: '',
  };
  constructor(private fb: FormBuilder,private authService :AuthService,
    private location: Location,private router: Router,private toastr: ToastrService) { }

  ngOnInit() {
    this.formGroup = this.fb.group({
      email: ['',[Validators.required,Validators.pattern('^.+@.+\..+$')]],
      password: ['',[Validators.required,Validators.pattern('/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,10}$/')]],
      confirmPassword: ['',[Validators.required]],
      securityQuestion: ['',[Validators.required]],
      securityQuestionAnswer: ['',[Validators.required,Validators.maxLength(150)]],
    },{ validator: CustomValidators.Match('password','confirmPassword')})
  }
  resetPassword(){
    if(!this.formGroup.valid){
      this.toastr.error('Please fill all required fields to proceed!');
      return;
   }
   this.data.email = this.formGroup.controls.email.value;
   this.data.password = this.formGroup.controls.newPassword.value;
   this.data.securityQuestion = this.formGroup.controls.securityQuestion.value;
   this.data.securityQuestionAnswer = this.formGroup.controls.securityQuestionAnswer.value;
   this.busy =  this.authService.changePassword(this.data).subscribe(response => {
        this.authService.setToken(response.token);
        this.authService.setIndentity(response);
        this.toastr.success(response.message);
        this.router.navigate(['/']); // redirect to dashboard view
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
