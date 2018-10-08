import {Component, EventEmitter} from '@angular/core';
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
import {MaterializeAction, toast} from 'angular2-materialize';
import {subscribeTo} from 'rxjs/internal/util/subscribeTo';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent {

  deleteBookModal = new EventEmitter<string|MaterializeAction>();
  bookActionModal = new EventEmitter<string|MaterializeAction>();
  addReviewModal = new EventEmitter<string|MaterializeAction>();
  isSubmitting = false;
  book: Book;
  editBookForm: FormGroup;
  addReviewForm: FormGroup;
  edit = false;
  categories: Category[];
  validationMessages: any;
  fileToUpload: File = null;
  approvalMode = 'approve';
  starList: boolean[] = [false, true, true, true, true];       // create a list which contains status of 5 stars
  rating: number;

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
    this.addReviewForm = this.fb.group({
      'comment': ['', Validators.required],
      'rating': [1, Validators.required]
    });
    this.approvalMode = this.book.is_approved ? 'reject' : 'approve';
  }

  openBookModal() {
    this.deleteBookModal.emit({action: 'modal', params: ['open']});
  }

  closeBookModal() {
    this.deleteBookModal.emit({action: 'modal', params: ['close']});
  }

  openBookActionModal() {
    this.bookActionModal.emit({action: 'modal', params: ['open']});
  }

  closeBookActionModal() {
    this.bookActionModal.emit({action: 'modal', params: ['close']});
  }

  openAddReviewModal() {
    this.addReviewModal.emit({action: 'modal', params: ['open']});
  }

  closeAddReviewModal() {
    this.addReviewModal.emit({action: 'modal', params: ['close']});
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

  setStar(data: any) {
    this.rating = data + 1;
    for (let i = 0; i <= 4; i++) {
      (i <= data) ? this.starList[i] = false : this.starList[i] = true;
    }
    this.addReviewForm.get('rating').patchValue(this.rating);
  }

  deleteBook(): void {
    this.isSubmitting = true;
    this.bookService.deleteBook(this.book.id)
      .subscribe(data => {
        this.isSubmitting = false;
        toast('Book deleted successfully.', 3000, 'green');
        this.router.navigateByUrl('/books');
      });
  }

  submitReview() {
    this.isSubmitting = true;
    this.bookService.createReview(this.book.id, this.addReviewForm.value)
      .subscribe( review => {
        this.isSubmitting = false;
        this.closeAddReviewModal();
        this.book.reviews.unshift(review);
        toast('Review added successfully.', 3000, 'green');
      });
  }

  bookAction(): void {
    this.isSubmitting = true;
    this.bookService.changeBookStatus(this.book, this.approvalMode)
      .subscribe(data => {
        this.isSubmitting = false;
        toast('Book '  + this.approvalMode + 'ed successfully.', 3000, 'green');
        this.router.navigateByUrl('/books');
      });
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
          this.isSubmitting = false;
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
