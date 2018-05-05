import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import {BookService} from '../../services/book.service';
import { Router } from '@angular/router';

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
