import { Component, OnInit } from '@angular/core';
import { TimeDataService } from '../../../shared/time-data.service';
import { TimesService } from '../times.service';
import { NavItem } from './nav-item';

@Component({
  selector: 'app-nested-menu',
  templateUrl: './nested-menu.component.html',
  styleUrls: ['./nested-menu.component.scss'],
})
export class NestedMenuComponent implements OnInit {
  constructor(
    private timeDataService: TimeDataService,
    private timeService: TimesService
  ) {}
  navItems_: string[] = [];
  navItems: NavItem[] = [];
  dataFetched: boolean = false;
  error = {
    status: false,
    message: '',
  };

  ngOnInit() {
    this.onFetch();
  }

  onFetch() {
    this.dataFetched = false;
    this.error.status = false;
    this.timeDataService.fetchTimezones().subscribe(
      (res) => {
        this.dataFetched = true;
        this.navItems_ = Object.values(res);
        const convertedNavItems: NavItem[] = [
          {
            displayName: 'TIMEZONES',
            children: [...this.timeDataService.convertArray(this.navItems_)],
          },
        ];
        this.timeService.setNavItems(convertedNavItems);
        this.navItems = this.timeService.getNavItems();
      },
      (err) => {
        this.dataFetched = true;
        this.error.status = true;
        this.error.message = err.message;
      }
    );
  }

  formatPath(path: any) {
    return path.split('/').join('&');
  }
}
