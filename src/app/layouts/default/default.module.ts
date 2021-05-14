import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default.component';
import { HomeComponent } from 'src/app/modules/home/home.component';
import { RouterModule } from '@angular/router';
import { TimesComponent } from 'src/app/modules/times/times.component';
import { BooksComponent } from 'src/app/modules/books/books.component';
import { ImagesComponent } from 'src/app/modules/images/images.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatSidenavModule } from '@angular/material/sidenav';

@NgModule({
  declarations: [
    DefaultComponent,
    HomeComponent,
    TimesComponent,
    BooksComponent,
    ImagesComponent,
  ],
  imports: [CommonModule, RouterModule, SharedModule, MatSidenavModule],
})
export class DefaultModule {}
