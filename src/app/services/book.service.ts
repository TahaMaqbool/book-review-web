import { Injectable } from '@angular/core';
import {Book} from '../models/book';
import {environment} from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  api: any;

  constructor(private http: HttpClient) {
    this.api = environment.api;
  }

  getBooks (): Observable<Book[]> {
    const url = this.api + '/books';
    return this.http.get<Book[]>(url)
      .pipe(
        map(data => data)
      );
  }

  createBook(book: Book): Observable<Book> {
    const url = this.api + '/books';
    console.log('before submit', book);
    return this.http.post<Book>(url, book);
  }

  updateBook(book: Book): Observable<Book> {
    const url = this.api + '/books/' + book.id;
    return this.http.put<Book>(url, book);
  }

  getBook (id: number): Observable<Book> {
    const url = this.api + '/books/' + id;
    return this.http.get<Book>(url)
      .pipe(
        map(data => data)
      );
  }

  deleteBook (id: number): Observable<Book> {
    const url = this.api + '/books/' + id;
    return this.http.delete<Book>(url);
  }

}
