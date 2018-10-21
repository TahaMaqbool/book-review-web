import {Component, EventEmitter, OnInit} from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {BookService} from '../../services/book.service';
import {Book} from '../../models/book';
import {AuthService} from '../../services/auth.service';
import {ValidationMessages} from '../../shared/form-helpers/validation-messages';
import {Category} from '../../models/category';
import {DomSanitizer} from '@angular/platform-browser';
import {MaterializeAction, toast} from 'angular2-materialize';
import {Review} from '../../models/review';
declare var Materialize: any;

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  isAuthenticated: boolean;
  deleteBookModal = new EventEmitter<string|MaterializeAction>();
  bookActionModal = new EventEmitter<string|MaterializeAction>();
  reviewModal = new EventEmitter<string|MaterializeAction>();
  isSubmitting = false;
  book: Book;
  editBookForm: FormGroup;
  reviewForm: FormGroup;
  edit = false;
  fileInputText: string;
  categories: Category[];
  validationMessages: any;
  fileToUpload: File = null;
  approvalMode = 'approve';
  reviewTitle: string;
  selectedReview: Review;
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
    this.fileInputText = this.book.book_img.name;
    this.editBookForm = this.fb.group({
      'id': [this.book.id],
      'title': [this.book.title, Validators.required],
      'description': [this.book.description, Validators.required],
      'author': [this.book.author, Validators.required],
      'book_img': [this.book.book_img.url.original, Validators.required],
      'category_id': [this.book.category_id, Validators.required],
    });
    this.reviewForm = this.fb.group({
      'index': [{value: null, disabled: true}],
      'comment': ['', Validators.required],
      'rating': [1, Validators.required]
    });
    this.approvalMode = this.book.is_approved ? 'reject' : 'approve';
  }

  ngOnInit() {
    this.authService.userSignedIn.subscribe(
      (authenticated) => {
        this.isAuthenticated = authenticated;
      }
    );
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

  openReviewModal(reviewMode: 'Add' | 'Edit' = 'Add') {
    if (!this.isAuthenticated) {
      this.router.navigate(['/login'], {
        queryParams: {
          returnUrl: this.route.snapshot.url.join('/')
        }});
      return;
    }
    this.reviewTitle = reviewMode;
    this.reviewModal.emit({action: 'modal', params: ['open']});
  }

  closeReviewModal() {
    this.reviewModal.emit({action: 'modal', params: ['close']});
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
    this.fileInputText = this.fileToUpload.name;
  }

  setStar(data: any) {
    this.rating = data + 1;
    for (let i = 0; i <= 4; i++) {
      (i <= data) ? this.starList[i] = false : this.starList[i] = true;
    }
    this.reviewForm.get('rating').patchValue(this.rating);
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
    const index = this.reviewForm.getRawValue().index;
    if (index != null) {
      this.bookService.updateReview(this.book.id, this.selectedReview.id, this.reviewForm.value)
        .subscribe( review => {
          this.isSubmitting = false;
          this.book.reviews[index] = review;
          this.closeReviewModal();
          toast('Review updated successfully.', 3000, 'green');
        });
    } else {
      this.bookService.createReview(this.book.id, this.reviewForm.value)
        .subscribe( review => {
          this.isSubmitting = false;
          this.closeReviewModal();
          this.book.reviews.unshift(review);
          toast('Review added successfully.', 3000, 'green');
        });
    }
    this.reviewForm.reset();
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
    if (typeof this.editBookForm.get('book_img').value === 'string') {
      this.editBookForm.removeControl('book_img');
    }
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

  onEditReview(review: Review, i: number) {
    this.openReviewModal('Edit');
    this.reviewForm.setValue({
      index: i,
      comment: review.comment,
      rating: review.rating
    });
    Materialize.updateTextFields();
    this.setEditStarRating(review.rating);
    this.selectedReview = review;
  }

  setEditStarRating(rating: number) {
    this.starList.fill(true);
    for (let i = 0; i <= rating - 1; i++) {
      this.starList[i] = false;
    }
  }

  onDeleteReview(review: Review) {
    this.bookService.deleteReview(this.book.id, review.id)
      .subscribe(
        success => {
          this.book.reviews = this.book.reviews.filter((item) => item !== review);
          toast('Review deleted successfully.', 3000, 'green');
        }, errorResponse => {
            toast(errorResponse.error.errors[0], 3000, 'red');
        }
      );
  }

  updateBook() {
    if (this.fileToUpload) {
      const sanitizedUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(this.fileToUpload));
      this.book.book_img.url.original = sanitizedUrl;
    }
    this.book.id = +this.editBookForm.get('id').value;
    this.book.title = this.editBookForm.get('title').value;
    this.book.description = this.editBookForm.get('description').value;
    this.book.author = this.editBookForm.get('author').value;
    this.book.category_id = this.editBookForm.get('category_id').value;
    this.book.user_id = this.authService.currentUser.value.id;
    this.editBookForm.addControl('book_img', new FormControl(this.book.book_img.url.original, Validators.required))
  }

  getFormData(object) {
    const formData = new FormData();
    Object.keys(object).forEach(key => formData.append(key, object[key]));
    return formData;
  }
}
