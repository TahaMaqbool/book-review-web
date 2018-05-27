import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {BookService} from '../../services/book.service';
import {Book} from '../../models/book';
import { Angular2TokenService } from 'angular2-token';
import {AuthService} from '../../services/auth.service';

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

  constructor(private route: ActivatedRoute,
              private router: Router,
              private location: Location,
              private fb: FormBuilder,
              public tokenService: Angular2TokenService,
              private bookService: BookService,
              public authService: AuthService) {
    this.editBookForm = this.fb.group({
      'id': [''],
      'title': ['', Validators.required],
      'description': ['', Validators.required],
      'author': ['', Validators.required]
    });
  }

  ngOnInit() {
    this.route.data.subscribe(({ book }) => {
      this.book = book;
    });
  }

  goBack(): void {
    this.location.back();
  }

  deleteBook(): void {
    this.bookService.deleteBook(this.book.id)
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
