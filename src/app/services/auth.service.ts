import { Injectable } from '@angular/core';
import {Angular2TokenService} from 'angular2-token';
import {Subject, Observable} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userSignedIn$: Subject<boolean> = new Subject();

  constructor(public authService: Angular2TokenService) {

    this.authService.validateToken().subscribe(
      res => res.status === 200 ? this.userSignedIn$.next(res.json().success) : this.userSignedIn$.next(false)
    );
  }

  logOutUser(): Observable<any> {
    return this.authService.signOut().pipe(
      map(res => {
        this.userSignedIn$.next(false);
        return res;
      })
    );
  }

  registerUser(signUpData:  {email: string, name: string, password: string, passwordConfirmation: string}): Observable<any> {
    return this.authService.registerAccount(signUpData).pipe(map(
      res => {
        this.userSignedIn$.next(true);
        return res;
      })
    );
  }

  logInUser(signInData: {email: string, password: string}): Observable<any> {

    return this.authService.signIn(signInData).pipe(map(
      res => {
        this.userSignedIn$.next(true);
        return res;
      }
    ));
  }
}
