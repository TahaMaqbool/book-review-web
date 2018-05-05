import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import {Book} from '../../models/book';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  books: any;

  constructor(private bookService: BookService) { }

  ngOnInit() {
    this.bookService.getBooks()
      .subscribe(data => {
      this.books = data;
    });
  }

}
