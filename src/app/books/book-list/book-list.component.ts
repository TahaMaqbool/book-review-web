import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  books: Book[];

  constructor(private bookService: BookService,
              public authService: AuthService) { }

  ngOnInit() {
    this.bookService.getBooks()
      .subscribe(data => {
        this.books = data;
      });
  }

}
