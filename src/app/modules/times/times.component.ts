import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TimeDataService } from 'src/app/shared/time-data.service';

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
    private timeDataService: TimeDataService
  ) {}

  ngOnInit(): void {
    this.updateTime();
    this.timeDataService.fetchTimezones();
  }

  updateTime(): void {
    setInterval(() => {
      this.time = new Date();
    }, 1000);
  }
  onTimeSelect() {
    this.router.navigate(['times', this.region]);
  }
}
