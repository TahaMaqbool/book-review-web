import {Component} from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {BookService} from '../../services/book.service';
import {Book} from '../../models/book';
import { Angular2TokenService } from 'angular2-token';
import {AuthService} from '../../services/auth.service';
import {ValidationMessages} from '../../shared/form-helpers/validation-messages';
import {Category} from '../../models/category';
import {DomSanitizer} from '@angular/platform-browser';
import {toast} from 'angular2-materialize';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent {

  isSubmitting = false;
  book: Book;
  editBookForm: FormGroup;
  edit = false;
  categories: Category[];
  validationMessages: any;
  fileToUpload: File = null;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private location: Location,
              private fb: FormBuilder,
              private sanitizer: DomSanitizer,
              private bookService: BookService,
              public authService: AuthService) {
    this.getBook();
    this.getCategories();
    this.editBookForm = this.fb.group({
      'id': [this.book.id],
      'title': [this.book.title, Validators.required],
      'description': [this.book.description, Validators.required],
      'author': [this.book.author, Validators.required],
      'book_img': ['', Validators.required],
      'category_id': [this.book.category_id, Validators.required],
    });
  }

  getBook() {
    this.route.data.subscribe(({ book }) => {
      this.book = book;
    });
  }

  getCategories() {
    this.route.data.subscribe(({ categories }) => {
      this.categories = categories;
    });
    this.validationMessages = ValidationMessages.getValidationMessages();
  }

  goBack(): void {
    this.location.back();
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    this.editBookForm.get('book_img').patchValue(this.fileToUpload);
  }

  deleteBook(): void {
    this.bookService.deleteBook(this.book.id)
      .subscribe(data => this.router.navigateByUrl('/books'));
  }

  submitForm() {
    this.isSubmitting = true;
    const formData = this.getFormData(this.editBookForm.value);
    formData.append('user_id', this.authService.currentUser.value.id.toString());
    this.bookService
      .updateBook(formData)
      .subscribe(
        data => {
          this.updateBook();
          toast('Book information updated successfully.', 3000, 'green');
          this.edit = false;
        },
        err => {
          this.isSubmitting = false;
          toast(err.error.message, 3000, 'red');
        }
      );
  }

  updateBook() {
    const sanitizedUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(this.fileToUpload));
    this.book.book_img.url.original = sanitizedUrl;
    this.book.id = +this.editBookForm.get('id').value;
    this.book.title = this.editBookForm.get('title').value;
    this.book.description = this.editBookForm.get('description').value;
    this.book.author = this.editBookForm.get('author').value;
    this.book.category_id = this.editBookForm.get('category_id').value;
    this.book.user_id = this.authService.currentUser.value.id;
  }

  getFormData(object) {
    const formData = new FormData();
    Object.keys(object).forEach(key => formData.append(key, object[key]));
    return formData;
  }
}
