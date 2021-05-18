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
  arrayOfNavItems!: [];
  navItems: NavItem[] = [];

  ngOnInit() {
    this.timeDataService.fetchTimezones();
    this.navItems = this.timeService.getNavItems();
  }
  onFetch() {
    this.timeDataService.fetchTimezones();
  }
}
