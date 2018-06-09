import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { AuthDialogComponent } from '../../auth/auth-dialog/auth-dialog.component';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { BookService } from '../../services/book.service';
import { Category } from '../../models/category';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  @ViewChild('authDialog') authDialog: AuthDialogComponent;

  categories: Category[];

  constructor(public authService: AuthService,
              private bookService: BookService,
              private router: Router) {
  }

  ngOnInit() {
    this.bookService.getCategories()
      .subscribe(data => {
        this.categories = data;
      });
  }

  categoryChange(category: Category) {
    this.categories.forEach(categoryItem => categoryItem.isSelected = false);
    category.isSelected = true;
    this.bookService.changeCategory(category);
  }


  presentAuthDialog(mode?: 'login'| 'register') {
    this.authDialog.openDialog(mode);
  }

  logOut() {
    this.authService.logOutUser().subscribe(() => this.router.navigate(['/']));
  }

}
