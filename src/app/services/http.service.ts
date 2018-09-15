import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class HttpService {

  api: any;
  headers = new HttpHeaders({
    'client': localStorage.getItem('client') || '',
    'uid': localStorage.getItem('uid') || '',
    'token-type': localStorage.getItem('tokenType') || '',
    'access-token': localStorage.getItem('accessToken') || ''
  });

  constructor(private http: HttpClient) {
    this.api = environment.token_auth_config.apiBase;
  }

  get(url: string, requestHeaders: Boolean = false): Observable<any> {
    url = this.api + url;
    const headers = this.headers;
    if (requestHeaders) {
      return this.http.get(url, {headers, observe: 'response'})
        .pipe(
//          tap(data => this.setToken(data)),
          map(data => data.body)
        );
    }
    return this.http.get(url)
      .pipe(
        map(data => data)
      );
  }

  post(url: string, formData: {}): Observable<any> {
    url = this.api + url;
    const headers = this.headers;
    return this.http.post(url, formData, {headers, observe: 'response'});
  }

  put(url: string, formData: FormData): Observable<any> {
    url = this.api + url + formData.get('id');
    const headers = this.headers;
    return this.http.put(url, formData, {headers, observe: 'response'});
  }

  patch(url: string): Observable<any> {
    url = this.api + url;
    const headers = this.headers;
    return this.http.put(url, {}, {headers, observe: 'response'});
  }

  delete (url: string, id: number): Observable<any> {
    url = this.api + url + id;
    const headers = this.headers;
    return this.http.delete(url, {headers, observe: 'response'});
  }

  setToken (data) {
    const accessToken = data.headers.get('accessToken');

    if (accessToken) { this.setLocalStorage('accessToken', accessToken); }
  }

  updateToken() {
    this.headers.append('access-token', localStorage.getItem('accessToken'));
  }

  setLocalStorage(key: string, data: string) {
    localStorage.setItem(key, data);
  }
}
