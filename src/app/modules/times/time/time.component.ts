import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.scss'],
})
export class TimeComponent implements OnInit {
  time: Date = new Date();

  constructor(private router: Router) {}

  ngOnInit(): void {}

  backToTimes() {
    this.router.navigate(['times']);
  }
}
