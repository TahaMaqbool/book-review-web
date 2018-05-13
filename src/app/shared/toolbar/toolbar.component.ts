import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { AuthDialogComponent } from '../../auth/auth-dialog/auth-dialog.component';
import { Angular2TokenService } from 'angular2-token';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  @ViewChild('authDialog') authDialog: AuthDialogComponent;

  constructor(public tokenAuthService: Angular2TokenService,
              public authService: AuthService,
              private router: Router) { }

  ngOnInit() {
  }


  presentAuthDialog(mode?: 'login'| 'register') {
    this.authDialog.openDialog(mode);
  }

  logOut() {
    this.authService.logOutUser().subscribe(() => this.router.navigate(['/']));
  }

}
