import {Review} from './review';

export class Book {
  id?: number;
  title: string;
  description: string;
  author: string;
  user_id?: number;
  book_img: { name: string, url: { original: '' | object, medium: '', thumb: ''} };
  category_id: number;
  is_approved?: boolean;
  reviews: Review[];
}
