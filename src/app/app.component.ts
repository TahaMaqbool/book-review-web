import { Component } from '@angular/core';
import { environment } from '../environments/environment';
import { Angular2TokenService } from 'angular2-token';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private authToken: Angular2TokenService) {
    this.authToken.init(environment.token_auth_config);
  }

  title = 'Book Review App';
}
