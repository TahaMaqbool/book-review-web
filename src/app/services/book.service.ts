import { Injectable } from '@angular/core';
import {Book} from '../models/book';
import {BehaviorSubject, Observable} from 'rxjs';
import { map, tap } from 'rxjs/operators';
import {Category} from '../models/category';
import {HttpService} from './http.service';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private category = new BehaviorSubject<Category>(null);
  selectedCategory = this.category.asObservable();

  constructor(private http: HttpService) {
  }

  changeCategory(category: Category) {
    this.category.next(category);
  }

  getCategories(): Observable<Category[]> {
    const url = '/categories';
    return this.http.get(url)
      .pipe(
        map(data => data)
      );
  }

  getBooks(category: Category): Observable<Book[]> {
    let url: any = '/books';
    const query = category === null ? '' : '?category=' + category.name;
    url = url + query;

    return this.http.get(url)
      .pipe(
        map(data => data)
      );
  }

  createBook(book: any): Observable<Book> {
    const url = '/books';
    return this.http.post(url, book);
  }

  updateBook(book: any): Observable<Book> {
    const url = '/books/';
    return this.http.put(url, book);
  }

  changeBookStatus(book: any, status: string): Observable<Book> {
    const url = '/books/' + book.id + '/' + status;
    return this.http.patch(url);
  }

  getBook (id: number): Observable<Book> {
    const url = '/books/' + id;
    return this.http.get(url)
      .pipe(
        map(data => data)
      );
  }

  deleteBook (id: number): Observable<Book> {
    const url = '/books/';
    return this.http.delete(url, id);
  }

}
