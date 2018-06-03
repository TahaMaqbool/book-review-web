import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import {Angular2TokenService} from 'angular2-token';
import {AuthService} from '../../services/auth.service';
import {CustomValidator} from '../../shared/form-helpers/custom-validator';
import {ValidationMessages} from '../../shared/form-helpers/validation-messages';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

  registerForm: FormGroup;
  validationMessages: any;
  loading = false;

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
    }, {validator: CustomValidator.matchPasswordValidator});
  }

  ngOnInit() { this.validationMessages = ValidationMessages.getValidationMessages(); }


  submitForm() {
    this.loading = true;
    this.authService.registerUser(this.registerForm.value).subscribe(

      (res) => {

        if (res.status === 200) {
          this.onFormResult.emit({signedUp: true, res});
          this.loading = false;
        }

      },

      (err) => {
        console.log(err.json());
        this.onFormResult.emit({signedUp: false, err});
        this.loading = false;
      }
    );

  }
}
