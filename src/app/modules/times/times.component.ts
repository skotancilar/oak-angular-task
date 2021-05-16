import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-times',
  templateUrl: './times.component.html',
  styleUrls: ['./times.component.scss'],
})
export class TimesComponent implements OnInit {
  // @Output() onTimeSelect: EventEmitter<any> = new EventEmitter();
  time: Date = new Date();
  region: string = 'Africa/Abidjan';

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.updateTime();
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
