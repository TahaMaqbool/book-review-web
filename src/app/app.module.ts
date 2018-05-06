import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BooksComponent } from './books/books.component';
import { AppRoutingModule } from './/app-routing.module';
import { BookListComponent } from './books/book-list/book-list.component';
import { HttpClientModule } from '@angular/common/http';
import { BookCreateComponent } from './books/book-create/book-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BookDetailComponent } from './books/book-detail/book-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    BooksComponent,
    BookListComponent,
    BookCreateComponent,
    BookDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
