import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {BookService} from '../../services/book.service';
import {Book} from '../../models/book';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {

  isSubmitting = false;
  book: Book;
  editBookForm: FormGroup;
  edit = false;
  bookId = +this.route.snapshot.paramMap.get('id');

  constructor(private route: ActivatedRoute,
              private router: Router,
              private location: Location,
              private fb: FormBuilder,
              private bookService: BookService) {
    this.editBookForm = this.fb.group({
      'id': [''],
      'title': ['', Validators.required],
      'description': ['', Validators.required],
      'author': ['', Validators.required]
    });
  }

  ngOnInit() {
    this.getBook();
  }

  getBook(): void {
    this.bookService.getBook(this.bookId)
      .subscribe(book => this.book = book);
  }

  goBack(): void {
    this.location.back();
  }

  deleteBook(): void {
    this.bookService.deleteBook(this.bookId)
      .subscribe(data => this.router.navigateByUrl('/books'));
  }

  submitForm() {
    this.isSubmitting = true;
    this.editBookForm.controls['id'].patchValue(this.book.id);
    const formData = this.editBookForm.value;
    this.bookService
      .updateBook(formData)
      .subscribe(
        data => this.edit = false,
        err => {
          this.isSubmitting = false;
        }
      );
  }

}
