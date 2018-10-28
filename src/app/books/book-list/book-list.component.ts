import {Component, OnDestroy, OnInit} from '@angular/core';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book';
import { AuthService } from '../../services/auth.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {Router} from '@angular/router';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit, OnDestroy {

  loading = false;
  routeTransition = false;
  books: Book[];
  selectedCategory: string;
  private unsubscribe: Subject<void> = new Subject();

  constructor(private bookService: BookService,
              private router: Router,
              public authService: AuthService) {
  }

  ngOnInit() {
    this.bookService.selectedCategory
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(
      category => {
        this.selectedCategory = category;
        this.getBooks();
      }
    );
  }

  getBooks() {
    this.loading = true;
    this.bookService.getBooks(this.selectedCategory)
      .subscribe(data => {
        this.books = data;
        this.loading = false;
      });
  }

  viewBook(book: Book) {
    this.routeTransition = true;
    this.router.navigate(['books/', book.id]);
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
    this.bookService.changeCategory(null);
  }
}
