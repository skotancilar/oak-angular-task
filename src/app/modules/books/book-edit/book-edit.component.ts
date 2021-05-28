import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BookService } from '../book.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.scss'],
})
export class BookEditComponent implements OnInit {
  id!: number;
  editMode = false;
  bookForm!: FormGroup;
  genres: string[] = [
    'Fiction',
    'Fantasy',
    'Horror',
    'Action',
    'History',
    'Romance',
    'Biography',
    'Children',
    'Other',
  ];
  maxDate = new Date(Date.now());
  defaultBookCover: string = 'https://i.stack.imgur.com/1hvpD.jpg';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }
  onSave() {
    if (this.editMode) {
      this.bookService.updateBook(this.id, this.bookForm.value);
      this.toastr.success('Book updated');
    } else {
      this.bookService.addBook(this.bookForm.value);
      this.toastr.success('New book added');
    }
    this.router.navigate(['../'], { relativeTo: this.route });
  }
  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  private initForm() {
    let title = '';
    let author = '';
    let imgPath = '';
    let genre = '';
    let date;
    let isbn!: number;

    if (this.editMode) {
      const book = this.bookService.getBook(this.id);
      title = book.title;
      author = book.author;
      imgPath = book.imgPath;
      genre = book.genre;
      date = book.pubDate;
      isbn = book.isbn;
    }
    this.bookForm = new FormGroup({
      title: new FormControl(title, Validators.required),
      author: new FormControl(author, Validators.required),
      imgPath: new FormControl(imgPath, Validators.required),
      genre: new FormControl(genre, Validators.required),
      pubDate: new FormControl(date, Validators.required),
      isbn: new FormControl(isbn, Validators.required),
    });
  }
  onErrorUrl(event: Event) {
    if (event) {
      this.bookForm.value.imgPath = this.defaultBookCover;
    }
  }
}
