import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { BookService } from '../../services/book.service';
import { Category } from '../../models/category';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  categories: Category[];
  isAllSelected = true;

  constructor(public authService: AuthService,
              private bookService: BookService,
              private router: Router,
              private route: ActivatedRoute,
              private location: Location) {
  }

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this.bookService.getCategories()
      .subscribe(data => {
        this.categories = data;
        this.handleSelectedCategory();
      });
  }

  handleSelectedCategory() {
    this.route.queryParams.subscribe(
      params => {
        if (Object.keys(params).length === 0) { this.resetFilter(); }
      }
    );
  }

  categoryChange(category: Category) {
    this.categories.forEach(categoryItem => categoryItem.isSelected = false);
    category.isSelected = true;
    this.isAllSelected = false;
    this.bookService.changeCategory(category.name);
  }

  resetFilter() {
    this.categories.forEach(categoryItem => categoryItem.isSelected = false);
    this.isAllSelected = true;
    this.bookService.changeCategory(null);
    this.location.replaceState('books');
  }

  logOut() {
    this.authService.logOutUser().subscribe(() => this.router.navigate(['/']));
  }

}
