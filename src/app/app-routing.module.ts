import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { BooksComponent } from './modules/books/books.component';
import { HomeComponent } from './modules/home/home.component';
import { ImagesComponent } from './modules/images/images.component';
import { TimesComponent } from './modules/times/times.component';

const routes: Routes = [
  {
    path: '',
    component: DefaultComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      { path: 'times', component: TimesComponent },
      { path: 'books', component: BooksComponent },
      { path: 'images', component: ImagesComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
