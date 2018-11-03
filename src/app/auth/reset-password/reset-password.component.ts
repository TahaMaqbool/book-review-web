import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ValidationMessages } from '../../shared/form-helpers/validation-messages';
import { MaterializeAction, toast } from 'angular2-materialize';
import { CustomValidator } from '../../shared/form-helpers/custom-validator';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordModal = new EventEmitter<string|MaterializeAction>();
  resetPasswordInstruction: string;
  resetPasswordForm: FormGroup;
  changePasswordForm: FormGroup;
  validationMessages: any;
  isResetForm = true;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public authService: AuthService,
    private fb: FormBuilder
  ) {
    this.resetPasswordForm = this.fb.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ]))
    });
  }

  ngOnInit() {
     this.route.queryParams.subscribe(data => {
       if (Object.keys(data).length !== 0) {
         console.log(data);
         this.isResetForm = false;
         this.buildChangePasswordForm();
       }
     });
    this.validationMessages = ValidationMessages.getValidationMessages();
  }

  submitResetForm() {
    this.loading = true;
    this.authService.resetPassword(this.resetPasswordForm.value)
      .subscribe(res => {
        this.loading = false;
        this.openResetPasswordModal();
        this.resetPasswordInstruction = JSON.parse(res._body).message;
        // toast(JSON.parse(res._body).message, 3000, 'green');
      }, errorResponse => {
        this.loading = false;
        toast(JSON.parse(errorResponse._body).errors[0], 3000, 'red');
      });
  }

  openResetPasswordModal() {
    this.resetPasswordModal.emit({action: 'modal', params: ['open']});
  }

  closeResetPasswordModal() {
    this.resetPasswordModal.emit({action: 'modal', params: ['close']});
  }

  buildChangePasswordForm() {
    this.changePasswordForm = this.fb.group({
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(8)
      ])),
      passwordConfirmation: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(8)
      ]))
    }, {validator: CustomValidator.matchPasswordValidator});
  }

  submitChangePasswordForm() {
    this.loading = true;
    this.authService.changePassword(this.changePasswordForm.value)
      .subscribe(() => {
        this.loading = false;
        toast('Your password is updated successfully.', 3000, 'green');
        this.router.navigateByUrl('/books');
      }, errorResponse => {
        this.loading = false;
        if (JSON.parse(errorResponse._body).errors[0] === 'User not found.') {
          toast('Your link may expired or user not found', 3000, 'red');
          this.isResetForm = true;
        }
      });
  }

}
