import {Component, Input, OnInit, EventEmitter} from '@angular/core';
import {ToolbarComponent} from '../../shared/toolbar/toolbar.component';
import {MaterializeAction, toast} from 'angular2-materialize';

@Component({
  selector: 'app-auth-dialog',
  templateUrl: './auth-dialog.component.html',
  styleUrls: ['./auth-dialog.component.css']
})
export class AuthDialogComponent implements OnInit {

  @Input('auth-mode') authMode: 'login' | 'register' = 'login';
  modalActions = new EventEmitter<string|MaterializeAction>();

  constructor() { }

  ngOnInit() {
  }

  openDialog(mode: 'login' | 'register' = 'login') {
    this.authMode = mode;
    this.modalActions.emit({action: 'modal', params: ['open']});
  }

  closeDialog() {
    this.modalActions.emit({action: 'modal', params: ['close']});
  }

  onLoginFormResult(e) {
    if (e.signedIn) {
      this.closeDialog();
      toast('Login Successful.', 3000, 'green');
    } else {
      toast(e.err.json().errors[0], 3000, 'red');
    }
  }

  onRegisterFormResult(e) {
    if (e.signedUp) {
      this.closeDialog();
      toast('You have registered successfully.', 3000, 'green');
    } else {
      toast(e.err.json().errors.full_messages[0], 3000, 'red');
    }
  }

  isLoginMode() {
    return this.authMode === 'login';
  }

  isRegisterMode() {
    return this.authMode === 'register';
  }
}
