import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { SharedModule } from './shared';
import { AppComponent } from './app.component';
import { BooksComponent } from './books/books.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthComponent } from './auth/auth.component';
import { BookCreateComponent } from './books/book-create/book-create.component';
import { BookDetailComponent } from './books/book-detail/book-detail.component';
import { LoginFormComponent } from './auth/login-form/login-form.component';
import { RegisterFormComponent } from './auth/register-form/register-form.component';
import { BookReviewComponent } from './books/book-review/book-review.component';
import {BookListComponent} from './books/book-list/book-list.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    BooksComponent,
    BookListComponent,
    BookCreateComponent,
    BookDetailComponent,
    LoginFormComponent,
    RegisterFormComponent,
    BookReviewComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    AppRoutingModule,
    HttpModule,
    BrowserAnimationsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
