import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import {Angular2TokenService} from 'angular2-token';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

  registerForm: FormGroup;

  @Output() onFormResult = new EventEmitter<any>();

  constructor(
    public tokenAuthSerivce: Angular2TokenService,
    public authService: AuthService,
    private fb: FormBuilder,
  ) {
    this.registerForm = this.fb.group({
       email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
       ])),
       name: ['', Validators.required],
       password: new FormControl('', Validators.compose([
       Validators.required,
       Validators.minLength(8)
       ])),
       passwordConfirmation: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(8)
      ]))
  });
  }

  account_validation_messages = {
    'name': [
      { type: 'required', message: 'Name is required'}
    ],
    'email': [
      { type: 'required', message: 'Email is required' },
      { type: 'pattern', message: 'Enter a valid email' }
    ],
    'confirm_password': [
      { type: 'required', message: 'Confirm password is required' }
    ],
    'password': [
      { type: 'required', message: 'Password is required' },
      { type: 'minlength', message: 'Password must be at least 8 characters long' },
    ],
   };

  ngOnInit() {}


  submitForm() {
    this.authService.registerUser(this.registerForm.value).subscribe(

      (res) => {

        if (res.status === 200) {
          this.onFormResult.emit({signedUp: true, res});
        }

      },

      (err) => {
        console.log(err.json());
        this.onFormResult.emit({signedUp: false, err});
      }
    );

  }
}
