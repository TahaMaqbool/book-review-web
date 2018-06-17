import { Injectable } from '@angular/core';
import {Book} from '../models/book';
import {environment} from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { map, tap } from 'rxjs/operators';
import {Category} from '../models/category';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  api: any;

  private category = new BehaviorSubject<Category>(null);
  selectedCategory = this.category.asObservable();

  constructor(private http: HttpClient) {
    this.api = environment.token_auth_config.apiBase;
  }

  changeCategory(category: Category) {
    this.category.next(category);
  }

  getBooks(category: Category): Observable<Book[]> {
    let url = this.api + '/books';
    const query = category === null ? '' : '?category=' + category.name;
    url = url + query;
    return this.http.get<Book[]>(url)
      .pipe(
        map(data => data)
      );
  }

  createBook(book: any): Observable<Book> {
    const url = this.api + '/books';
    return this.http.post<Book>(url, book);
  }

  updateBook(book: any): Observable<Book> {
    const url = this.api + '/books/' + book.get('id');
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

  getCategories(): Observable<Category[]> {
    const url = this.api + '/categories';
    return this.http.get<Category[]>(url)
      .pipe(
        map(data => data)
      );
  }

}
