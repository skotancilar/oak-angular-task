import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { Subscription } from 'rxjs';
// import { AuthService } from 'src/app/modules/auth/auth.service';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss'],
})
export class DefaultComponent implements OnInit {
  isSideBarOpen = false;

  ngOnInit(): void {}

  toggleSideBar() {
    this.isSideBarOpen = !this.isSideBarOpen;
  }
}
