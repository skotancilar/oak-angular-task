export class Book {
  public title: string;
  public author: string;
  public imgPath: string;
  public genre: string;
  public publishDate: Date;
  public isbn: number;
  constructor(
    title: string,
    author: string,
    imgPath: string,
    genre: string,
    publishDate: Date,
    isbn: number
  ) {
    this.title = title;
    this.author = author;
    this.imgPath = imgPath;
    this.publishDate = publishDate;
    this.genre = genre;
    this.isbn = isbn;
  }
}
