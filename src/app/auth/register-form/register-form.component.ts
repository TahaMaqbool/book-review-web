import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Angular2TokenService} from 'angular2-token';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

  signUpUser = {
    email: '',
    name: '',
    password: '',
    passwordConfirmation: ''
  };

  @Output() onFormResult = new EventEmitter<any>();

  constructor(public tokenAuthSerivce: Angular2TokenService, public authService: AuthService) { }

  ngOnInit() {}


  onSignUpSubmit() {

    this.authService.registerUser(this.signUpUser).subscribe(

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
