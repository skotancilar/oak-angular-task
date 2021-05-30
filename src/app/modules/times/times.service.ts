import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { NavItem } from './nested-menu/nav-item';

@Injectable({ providedIn: 'root' })
export class TimesService {
  navItemsChanged = new Subject<NavItem[]>();

  navItems: NavItem[] = [];

  setNavItems(navItems: NavItem[]) {
    this.navItems = navItems;
    this.navItemsChanged.next(this.navItems);
  }

  getNavItems() {
    return this.navItems.slice();
  }
}
