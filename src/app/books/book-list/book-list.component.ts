import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book';
import { AuthService } from '../../services/auth.service';
import {Category} from '../../models/category';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  loading = false;
  books: Book[];
  selectedCategory: Category;

  constructor(private bookService: BookService,
              public authService: AuthService) { }

  ngOnInit() {
    this.bookService.selectedCategory.subscribe(
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

}
