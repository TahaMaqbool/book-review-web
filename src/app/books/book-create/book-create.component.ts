import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import {BookService} from '../../services/book.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import { toast } from 'angular2-materialize';
import {Category} from '../../models/category';

@Component({
  selector: 'app-book-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.css']
})

export class BookCreateComponent implements OnInit {
  isSubmitting = false;
  bookForm: FormGroup;
  categories: Category[];

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private route: ActivatedRoute,
    public authService: AuthService,
    private router: Router) {
    this.bookForm = this.fb.group({
      'title': ['', Validators.required],
      'description': ['', Validators.required],
      'category_id': ['', Validators.required],
      'author': ['', Validators.required]
    });
  }

  ngOnInit() {
    this.route.data.subscribe(({ categories }) => {
      this.categories = categories;
    });
  }

  submitForm() {
    this.isSubmitting = true;

    const formData = this.bookForm.value;
    formData.user_id = this.authService.currentUser.value.id;

    this.bookService
      .createBook(formData)
      .subscribe(
        data => {
          this.isSubmitting = false;
          toast('Book created successfully.', 3000, 'green');
          this.router.navigateByUrl('/books');
        },
        err => {
          this.isSubmitting = false;
          toast(err.error.message, 3000, 'red');
        }
      );
  }
}
