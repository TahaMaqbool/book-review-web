import { Injectable, } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { empty } from 'rxjs/observable/empty';
import { catchError } from 'rxjs/operators/catchError';
import {Book} from '../../models/book';
import {BookService} from '../../services/book.service';

@Injectable({
  providedIn: 'root'
})

export class BookDetailResolver implements Resolve<Book> {
  constructor(
    private bookService: BookService,
    private router: Router
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {

    return this.bookService.getBook(route.params['id'])
      .pipe(catchError(
        err => {
          this.router.navigate(['404']);
          return empty();
        }
      ));
  }
}
