import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BookListComponent} from './books/book-list/book-list.component';
import {BookCreateComponent} from './books/book-create/book-create.component';
import {BookDetailComponent} from './books/book-detail/book-detail.component';
import {NotFoundComponent} from './shared/not-found/not-found.component';
import {BookDetailResolver} from './books/book-detail/book-detail-resolver.service';
import {AuthGuard} from './services/auth-guard.service';
import {CategoryResolver} from './books/book-create/category-resolver.service';

const routes: Routes = [
  { path: 'books', component: BookListComponent },
  {
    path: 'books/new',
    component: BookCreateComponent,
    resolve: { categories: CategoryResolver },
    canActivate: [AuthGuard]
  },
  { path: 'books/:id', component: BookDetailComponent, resolve: { book: BookDetailResolver }},
  { path: '', redirectTo: '/books', pathMatch: 'full' },
  { path: '404', component: NotFoundComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
