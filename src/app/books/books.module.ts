import { NgModule } from '@angular/core';
import { SharedModule } from '../shared';
import { BooksComponent } from './books.component';
import { BooksRoutingModule } from './books-routing.module';
import { BookCreateComponent } from './book-create/book-create.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { BookListComponent } from './book-list/book-list.component';
import { BookReviewComponent } from './book-review/book-review.component';

@NgModule({
  imports: [
    SharedModule,
    BooksRoutingModule
  ],
  declarations: [
    BooksComponent,
    BookListComponent,
    BookCreateComponent,
    BookDetailComponent,
    BookReviewComponent
  ],
  exports: [
  ]
})
export class BooksModule {}
