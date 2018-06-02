import { Injectable, } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { empty } from 'rxjs/observable/empty';
import { catchError } from 'rxjs/operators/catchError';
import {Category} from '../../models/category';
import {BookService} from '../../services/book.service';

@Injectable({
  providedIn: 'root'
})

export class CategoryResolver implements Resolve<Category> {
  constructor(
    private bookService: BookService
  ) {}

  resolve(): Observable<any> {

    return this.bookService.getCategories()
      .pipe(catchError(
        err => {
          return empty();
        }
      ));
  }
}
