export class Book {
  public title: string;
  public author: string;
  public imgPath: string;
  public genre: string;
  public pubDate: Date;
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
    this.pubDate = publishDate;
    this.genre = genre;
    this.isbn = isbn;
  }
}
