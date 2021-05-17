import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../book.model';
import { BookService } from '../book.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
})
export class BookListComponent implements OnInit {
  books!: Book[];

  constructor(
    private bookService: BookService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.bookService.booksChanged.subscribe((books: Book[]) => {
      this.books = books;
    });
    this.books = this.bookService.getBooks();
  }

  onAddBook() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}
