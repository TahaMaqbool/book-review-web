import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import {BookService} from '../../services/book.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {Category} from '../../models/category';
import {ValidationMessages} from '../../shared/form-helpers/validation-messages';
import {MaterializeAction, toast} from 'angular2-materialize';

@Component({
  selector: 'app-book-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.css']
})

export class BookCreateComponent implements OnInit {
  isSubmitting = false;
  bookForm: FormGroup;
  categories: Category[];
  validationMessages: any;
  fileToUpload: File = null;
  modalActions = new EventEmitter<string|MaterializeAction>();

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private route: ActivatedRoute,
    public authService: AuthService,
    private router: Router) {
    this.bookForm = this.fb.group({
      'title': ['', Validators.required],
      'description': ['', Validators.required],
      'book_img': [null, Validators.required],
      'category_id': ['', Validators.required],
      'author': ['', Validators.required]
    });
  }

  ngOnInit() {
    this.route.data.subscribe(({ categories }) => {
      this.categories = categories;
    });
    this.validationMessages = ValidationMessages.getValidationMessages();
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    this.bookForm.get('book_img').patchValue(this.fileToUpload);
  }

  submitForm() {
    this.isSubmitting = true;

    const formData = this.getFormData(this.bookForm.value);
    formData.append('user_id', this.authService.currentUser.value.id.toString());

    this.bookService
      .createBook(formData)
      .subscribe(
        data => {
          this.isSubmitting = false;
          this.modalActions.emit({action: 'modal', params: ['open']});
        },
        err => {
          this.isSubmitting = false;
          toast(err.error.message, 3000, 'red');
        }
      );
  }

  closeModal() {
    this.modalActions.emit({action: 'modal', params: ['close']});
    this.router.navigateByUrl('/books');
  }

  getFormData(object) {
    const formData = new FormData();
    Object.keys(object).forEach(key => formData.append(key, object[key]));
    return formData;
  }
}
