import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {AuthService} from '../services/auth.service';
import {CustomValidator} from '../shared/form-helpers/custom-validator';
import {ValidationMessages} from '../shared/form-helpers/validation-messages';
import {toast} from 'angular2-materialize';


@Component({
  selector: 'app-auth-page',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit {
  authType: String = '';
  title: String = '';
  returnUrl: any;
  authForm: FormGroup;
  validationMessages: any;
  loading = false;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public authService: AuthService,
    private fb: FormBuilder
  ) {

    this.authForm = this.fb.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(8)
      ]))
    }, {validator: CustomValidator.matchPasswordValidator});
  }

  ngOnInit() {
    this.route.url.subscribe(data => {
      this.authType = data[data.length - 1].path;
      this.title = (this.authType === 'login') ? 'Sign in' : 'Sign up';
      if (this.authType === 'register') {
        this.authForm.addControl('name', new FormControl('', Validators.required));
        this.authForm.addControl('passwordConfirmation', new FormControl(
          '', [Validators.required, Validators.minLength(8)]));
      }
    });
    this.route.queryParams
      .subscribe(params => {
        this.returnUrl = params['returnUrl'] || '/books';
      });
    this.validationMessages = ValidationMessages.getValidationMessages();
  }

  submitForm() {
    const credentials = this.authForm.value;
    this.loading = true;
    if (this.authType === 'login') {
      this.authService.logInUser(credentials).subscribe(
        res => {
          if (res.status === 200) {
            this.loading = false;
            toast('Login Successful.', 3000, 'green');
            this.router.navigateByUrl(this.returnUrl);
          }
        },
        error => {
          this.loading = false;
          toast(error.json().errors[0], 3000, 'red');
        }
      );
    } else {
      this.authService.registerUser(credentials).subscribe(
        res => {
          if (res.status === 200) {
            this.loading = false;
            toast('You have registered successfully.', 3000, 'green');
            this.router.navigate(['/books']);
          }
        },
        error => {
          this.loading = false;
          toast(error.err.json().errors.full_messages[0], 3000, 'red');
        }
      );
    }
  }
}
