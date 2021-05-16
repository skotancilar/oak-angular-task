import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default.component';
import { HomeComponent } from 'src/app/modules/home/home.component';
import { RouterModule } from '@angular/router';
import { TimesComponent } from 'src/app/modules/times/times.component';
import { BooksComponent } from 'src/app/modules/books/books.component';
import { ImagesComponent } from 'src/app/modules/images/images.component';
import { TimeComponent } from 'src/app/modules/times/time/time.component';
import { BookDetailComponent } from 'src/app/modules/books/book-detail/book-detail.component';
import { BookEditComponent } from 'src/app/modules/books/book-edit/book-edit.component';
import { BookItemComponent } from 'src/app/modules/books/book-item/book-item.component';
import { BookListComponent } from 'src/app/modules/books/book-list/book-list.component';
import { BookStartComponent } from 'src/app/modules/books/book-start/book-start.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    DefaultComponent,
    HomeComponent,
    TimesComponent,
    BooksComponent,
    ImagesComponent,
    TimeComponent,
    BookDetailComponent,
    BookEditComponent,
    BookItemComponent,
    BookListComponent,
    BookStartComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MatSidenavModule,
    MatCardModule,
    MatMenuModule,
    MatButtonModule,
    FlexLayoutModule,
    MatDividerModule,
    MatIconModule,
    RouterModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
  ],
})
export class DefaultModule {}
