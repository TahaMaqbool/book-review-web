import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Angular2TokenService} from 'angular2-token';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;

  @Output() onFormResult = new EventEmitter<any>();

  constructor(public authService: AuthService,
              public authTokenService: Angular2TokenService,
              private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.required)
    });
  }

  account_validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required' },
      { type: 'pattern', message: 'Enter a valid email' }
    ],
    'password': [
      { type: 'required', message: 'Password is required' }
    ]
  };

  ngOnInit() {
  }


  onSignInSubmit() {
    this.loading = true;
    this.authService.logInUser(this.loginForm.value).subscribe(
      res => {
        if (res.status === 200) {
          this.loading = false;
          this.onFormResult.emit({signedIn: true, res});
        }
      },
      err => {
        console.log('err:', err);
        this.loading = false;
        this.onFormResult.emit({signedIn: false, err});
      }
    );
  }
}
