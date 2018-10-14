import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Review} from '../../models/review';

@Component({
  selector: 'app-book-review',
  templateUrl: './book-review.component.html',
  styleUrls: ['./book-review.component.css']
})
export class BookReviewComponent implements OnInit {

  starList: boolean[] = [true, true, true, true, true];       // create a list which contains status of 5 stars
  rating: number;

  constructor() { }

  @Input() review: Review;
  @Input() canModify: boolean;
  @Output() editReview = new EventEmitter<boolean>();
  @Output() deleteReview = new EventEmitter<boolean>();

  setStar(data: any) {
    this.rating = data + 1;
    for (let i = 0; i <= 4; i++) {
      (i <= data) ? this.starList[i] = false : this.starList[i] = true;
    }
  }

  setInitialRating() {
    for (let i = 0; i <= this.review.rating - 1; i++) {
      this.starList[i] = false;
    }
  }


  ngOnInit() {
    this.setInitialRating();
  }

  editClicked() {
    this.editReview.emit(true);
  }

  deleteClicked() {
    this.deleteReview.emit(true);
  }

}
