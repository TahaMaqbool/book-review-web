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
      'email': ['', Validators.required],
      'name': ['', Validators.required],
      'password': ['', Validators.required],
      'passwordConfirmation': ['', Validators.required]
    });
  }

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
