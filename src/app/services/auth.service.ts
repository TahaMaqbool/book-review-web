import { Injectable } from '@angular/core';
import {Angular2TokenService} from 'angular2-token';
import {Subject, Observable, BehaviorSubject, ReplaySubject} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, tap} from 'rxjs/operators';
import { User } from '../models/user';
import {Response} from '@angular/http';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  public userSignedIn = new BehaviorSubject<boolean>(false);
  public currentUser = new BehaviorSubject<User>(null);

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
        this.userSignedIn.next(true);
        this.currentUser.next(res.json().data);
        return res;
      })
    );
  }

  logInUser(signInData: {email: string, password: string}): Observable<any> {

    return this.authService.signIn(signInData).pipe(map(
      res => {
        this.userSignedIn.next(true);
        this.currentUser.next(res.json().data);
        return res;
      }
    ));
  }

  resetPassword(resetPasswordData: {email: string}): Observable<any> {
    return this.authService.resetPassword(resetPasswordData).pipe(map(
      res => {
        return res;
      }
    ));
  }

  changePassword(updatePasswordData: {password: string, passwordConfirmation: string, resetPasswordToken: string}): Observable<any> {
    return this.authService.updatePassword(updatePasswordData).pipe(map(
      res => {
        this.userSignedIn.next(true);
        this.currentUser.next(res.json().data);
        return res;
      }
    ));
  }

  getUser(): User {
    return this.currentUser.value;
  }

  setUser(val): void {
    this.userSignedIn.next(val.success);
    this.currentUser.next(val.data);
  }

  resetUser(): void {
    this.userSignedIn.next(false);
    this.currentUser.next(null);
  }
}
