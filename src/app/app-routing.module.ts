import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { BookDetailComponent } from './modules/books/book-detail/book-detail.component';
import { BookEditComponent } from './modules/books/book-edit/book-edit.component';
import { BookStartComponent } from './modules/books/book-start/book-start.component';
import { BooksComponent } from './modules/books/books.component';
import { HomeComponent } from './modules/home/home.component';
import { ImageListComponent } from './modules/images/image-list/image-list.component';
import { ImageComponent } from './modules/images/image/image.component';
import { ImagesComponent } from './modules/images/images.component';
import { TimeComponent } from './modules/times/time/time.component';
import { TimesComponent } from './modules/times/times.component';
import { NotFoundComponent } from './modules/not-found/not-found.component';
import { AuthComponent } from './modules/auth/auth.component';
import { AuthGuard } from './modules/auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: DefaultComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'times',
        component: TimesComponent,

        children: [{ path: ':timezone', component: TimeComponent }],
      },
      {
        path: 'books',
        component: BooksComponent,
        children: [
          { path: '', component: BookStartComponent },
          { path: 'new', component: BookEditComponent },
          { path: ':id', component: BookDetailComponent },
          { path: ':id/edit', component: BookEditComponent },
        ],
      },
      {
        path: 'images',
        component: ImagesComponent,
        children: [
          { path: 'upload', component: ImageComponent },
          { path: 'list', component: ImageListComponent },
        ],
      },
    ],
  },
  { path: 'auth', component: AuthComponent },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '/404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
