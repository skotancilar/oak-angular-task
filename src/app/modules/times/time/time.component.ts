import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TimeDataService } from 'src/app/shared/time-data.service';
import { Timezone } from './timezone.model';

@Component({
  selector: 'app-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.scss'],
})
export class TimeComponent implements OnInit {
  timezone_!: Timezone;
  timezone: string = '';
  isDataFetched = false;
  error = {
    status: false,
    message: '',
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private timeDataService: TimeDataService
  ) {}

  ngOnInit() {
    this.onRefresh();
  }

  onRefresh() {
    this.route.params.subscribe((params: Params) => {
      this.isDataFetched = false;
      this.error.status = false;
      this.timezone = params['timezone'].split('&').join('/');
      this.timeDataService.fetchTimezone(this.timezone).subscribe(
        (res: Timezone) => {
          this.isDataFetched = true;
          this.timezone_ = Object.assign(res);
          console.log(this.timezone_);
        },
        (err) => {
          this.error.status = true;
          this.isDataFetched = true;
          this.error.message = err.message;
        }
      );
    });
  }

  backToTimes() {
    this.router.navigate(['times']);
  }
}
