import { Injectable } from '@angular/core';
import {Angular2TokenService} from 'angular2-token';
import {Subject, Observable, BehaviorSubject} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userSignedIn$: Subject<boolean> = new Subject();
  currentUser$ = new BehaviorSubject(null);

  constructor(public authService: Angular2TokenService) {

    this.authService.validateToken().subscribe(
      res => res.status === 200 ? this.setUser(res.json()) : this.resetUser
    );
  }

  logOutUser(): Observable<any> {
    return this.authService.signOut().pipe(
      map(res => {
        this.resetUser();
        return res;
      })
    );
  }

  registerUser(signUpData:  {email: string, name: string, password: string, passwordConfirmation: string}): Observable<any> {
    return this.authService.registerAccount(signUpData).pipe(map(
      res => {
        this.userSignedIn$.next(true);
        this.currentUser$.next(res.json().data);
        return res;
      })
    );
  }

  logInUser(signInData: {email: string, password: string}): Observable<any> {

    return this.authService.signIn(signInData).pipe(map(
      res => {
        this.userSignedIn$.next(true);
        this.currentUser$.next(res.json().data);
        return res;
      }
    ));
  }

  setUser(val): void {
    this.userSignedIn$.next(val.success);
    this.currentUser$.next(val.data);
  }

  resetUser(): void {
    this.userSignedIn$.next(false);
    this.currentUser$.next(null);
  }
}
