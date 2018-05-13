import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book';
import { Angular2TokenService } from 'angular2-token';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  books: Book[];

  constructor(private bookService: BookService,
              public authTokenService: Angular2TokenService) { }

  ngOnInit() {
    this.bookService.getBooks()
      .subscribe(data => {
        this.books = data;
      });
  }

}
