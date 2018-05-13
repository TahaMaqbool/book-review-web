import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import {BookService} from '../../services/book.service';
import { Router } from '@angular/router';
import { Angular2TokenService } from 'angular2-token';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-book-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.css']
})
export class BookCreateComponent implements OnInit {
  isSubmitting = false;
  bookForm: FormGroup;
  data: any;

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    public tokenService: Angular2TokenService,
    public authService: AuthService,
    private router: Router) {
    this.bookForm = this.fb.group({
      'title': ['', Validators.required],
      'description': ['', Validators.required],
      'author': ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  submitForm() {
    this.isSubmitting = true;

    const formData = this.bookForm.value;
    formData.user_id = this.authService.currentUser$.getValue().id;

    this.bookService
      .createBook(formData)
      .subscribe(
        data => this.router.navigateByUrl('/books'),
        err => {
          this.isSubmitting = false;
        }
      );
  }

}
