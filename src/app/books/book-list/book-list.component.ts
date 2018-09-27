import {Component, OnDestroy, OnInit} from '@angular/core';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book';
import { AuthService } from '../../services/auth.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit, OnDestroy {

  loading = false;
  books: Book[];
  selectedCategory: string;
  private unsubscribe: Subject<void> = new Subject();

  constructor(private bookService: BookService,
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

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
    this.bookService.changeCategory(null);
  }
}
