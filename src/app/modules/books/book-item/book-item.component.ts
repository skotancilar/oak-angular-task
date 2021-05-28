import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Book } from '../book.model';
import { BookService } from '../book.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-book-item',
  templateUrl: './book-item.component.html',
  styleUrls: ['./book-item.component.scss'],
})
export class BookItemComponent implements OnInit {
  @Input() book!: Book;
  @Input() index!: number;
  id!: number;
  isSelected = true;
  defaultBookCover = 'https://i.stack.imgur.com/1hvpD.jpg';
  constructor(
    private bookService: BookService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
    });
  }

  onEditBook(event: Event): void {
    this.router.navigate(['books', this.index, 'edit']);
    event.stopPropagation();
  }
  onDeleteBook() {
    this.bookService.deleteBook(this.index);
    this.toastr.info('Book Deleted');
    this.router.navigate(['/books']);
  }
  updateUrl(event: Event) {
    this.book.imgPath = this.defaultBookCover;
  }
}
