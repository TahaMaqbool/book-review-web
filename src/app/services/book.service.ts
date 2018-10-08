import { Injectable } from '@angular/core';
import {Book} from '../models/book';
import {BehaviorSubject, Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import {Category} from '../models/category';
import {HttpService} from './http.service';
import {Review} from '../models/review';
import {HttpResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private category = new BehaviorSubject<string>(null);
  selectedCategory = this.category.asObservable();

  constructor(private http: HttpService) {
  }

  changeCategory(category: string) {
    this.category.next(category);
  }

  getCategories(): Observable<Category[]> {
    const url = '/categories';
    return this.http.get(url)
      .pipe(
        map(data => data)
      );
  }

  getBooks(category: string): Observable<Book[]> {
    let url: any = '/books';
    const query = category === null || category === undefined ? '' : '?category=' + category;
    url = url + query;

    return this.http.get(url, true)
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
    return this.http.get(url, true)
      .pipe(
        map(data => data)
      );
  }

  deleteBook (id: number): Observable<Book> {
    const url = '/books/';
    return this.http.delete(url, id);
  }

  createReview(bookId: number, review: Review): Observable<Review> {
    const url = '/books/' + bookId + '/reviews';
    return this.http.post(url, review)
      .pipe(
        map(data => data.body)
      );
  }

}
