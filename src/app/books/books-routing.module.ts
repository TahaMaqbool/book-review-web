import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../services/auth-guard.service';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { BookListComponent } from './book-list/book-list.component';
import { CategoryResolver } from './book-create/category-resolver.service';
import { BookCreateComponent } from './book-create/book-create.component';
import { BookDetailResolver } from './book-detail/book-detail-resolver.service';

const routes: Routes = [
  { path: '', component: BookListComponent },
  {
    path: 'new',
    component: BookCreateComponent,
    resolve: { categories: CategoryResolver },
    canActivate: [AuthGuard]
  },
  {
    path: ':id',
    component: BookDetailComponent,
    resolve: { book: BookDetailResolver, categories: CategoryResolver }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BooksRoutingModule {}
