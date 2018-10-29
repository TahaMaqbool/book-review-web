import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NotFoundComponent} from './shared/not-found/not-found.component';

const routes: Routes = [
  {
    path: 'books',
    loadChildren: './books/books.module#BooksModule'
  },
  { path: '', redirectTo: '/books', pathMatch: 'full' },
  { path: '404', component: NotFoundComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
