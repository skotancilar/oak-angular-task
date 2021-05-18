import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Book } from './book.model';

@Injectable({ providedIn: 'root' })
export class BookService {
  booksChanged = new Subject<Book[]>();

  private books: Book[] = [
    new Book(
      'Shadow and Bone',
      'Leigh Bardugo',
      'https://images-na.ssl-images-amazon.com/images/I/51LCJlg5oFS._SX331_BO1,204,203,200_.jpg',
      'Fantasy',
      new Date('Tue May 07 2013 03:00:00 GMT+0300 (GMT+03:00)'),
      1250027438
    ),
    new Book(
      "Swann's Way: In Search of Lost Time, Vol. 1",
      'Marcel Proust',
      'https://images-na.ssl-images-amazon.com/images/I/5146m4I7h-L._SX332_BO1,204,203,200_.jpg',
      'Biography',
      new Date('Sat Oct 30 2004 03:00:00 GMT+0300 (GMT+03:00)'),
      1424379640
    ),
    new Book(
      'The Catcher in the Rye',
      'J. D. Salinger',
      'https://images-na.ssl-images-amazon.com/images/I/518dVCGFuhL._SX323_BO1,204,203,200_.jpg',
      'Other',
      new Date('Mon Jan 01 2001 02:00:00 GMT+0200 (GMT+03:00)'),
      9780316769174
    ),
    new Book(
      'The Great Gatsby',
      'F. Scott Fitzgerald',
      'https://images-na.ssl-images-amazon.com/images/I/41u-0MIGcpS._SX326_BO1,204,203,200_.jpg',
      'Fiction',
      new Date('Sat Oct 30 2004 03:00:00 GMT+0300 (GMT+03:00)'),
      9780743273565
    ),
    new Book(
      'The Lord of the Rings: 50th Anniversary, One Vol. Edition',
      'J.R.R. Tolkien',
      'https://images-na.ssl-images-amazon.com/images/I/51eq24cRtRL._SX331_BO1,204,203,200_.jpg',
      'Fantasy',
      new Date('Sat Oct 30 2004 03:00:00 GMT+0300 (GMT+03:00)'),
      9780743273565
    ),
  ];

  getBooks() {
    return this.books.slice();
  }

  getBook(index: number) {
    return this.books[index];
  }

  addBook(book: Book) {
    this.books.push(book);
    this.booksChanged.next(this.books.slice());
  }
  updateBook(index: number, newBook: Book) {
    this.books[index] = newBook;
    this.booksChanged.next(this.books.slice());
  }

  deleteBook(index: number) {
    this.books.splice(index, 1);
    this.booksChanged.next(this.books.slice());
  }
}
