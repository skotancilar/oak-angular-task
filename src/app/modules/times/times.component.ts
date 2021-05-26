import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TimeDataService } from 'src/app/shared/time-data.service';
import { TimesService } from './times.service';

@Component({
  selector: 'app-times',
  templateUrl: './times.component.html',
  styleUrls: ['./times.component.scss'],
})
export class TimesComponent implements OnInit {
  time: Date = new Date();
  region: string = 'Africa/Abidjan';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private timeService: TimesService,
    private timeDataService: TimeDataService
  ) {}

  ngOnInit(): void {
    this.updateTime();
  }

  updateTime(): void {
    setInterval(() => {
      this.time = new Date();
    }, 1000);
  }
}
