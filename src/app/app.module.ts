import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { Angular2TokenService } from 'angular2-token';

import { AppComponent } from './app.component';
import { BooksComponent } from './books/books.component';
import { AppRoutingModule } from './/app-routing.module';
import {ngxLoadingAnimationTypes, NgxLoadingModule} from 'ngx-loading';
import { AuthComponent } from './auth/auth.component';
import { HttpClientModule } from '@angular/common/http';
import { BookCreateComponent } from './books/book-create/book-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BookDetailComponent } from './books/book-detail/book-detail.component';
import { ToolbarComponent } from './shared/toolbar/toolbar.component';
import { AuthDialogComponent } from './auth/auth-dialog/auth-dialog.component';
import { MaterializeModule } from 'angular2-materialize';
import { LoginFormComponent } from './auth/login-form/login-form.component';
import { RegisterFormComponent } from './auth/register-form/register-form.component';
import { LoaderComponent } from './shared/loader/loader.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
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
    ToolbarComponent,
    AuthDialogComponent,
    LoginFormComponent,
    RegisterFormComponent,
    LoaderComponent,
    NotFoundComponent,
    BookReviewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterializeModule,
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.threeBounce,
      backdropBackgroundColour: 'rgba(0,0,0,1)',
      backdropBorderRadius: '4px',
      primaryColour: '#ffffff',
      secondaryColour: '#ffffff',
      tertiaryColour: '#ffffff'
    })
  ],
  providers: [Angular2TokenService],
  bootstrap: [AppComponent]
})
export class AppModule { }
