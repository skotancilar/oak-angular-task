import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { NavItem } from './nested-menu/nav-item';

@Injectable({ providedIn: 'root' })
export class TimesService {
  navItemsChanged = new Subject<NavItem[]>();
  //   navItems: NavItem[] = [
  //     {
  //       displayName: 'TIMEZONES',
  //       children: [
  //         {
  //           displayName: 'Africa',
  //           route: 'Africa/Abidjan',
  //           children: [
  //             {
  //               displayName: 'Abidjan',
  //               route: 'Africa/Abidjan',
  //               children: [],
  //             },
  //             {
  //               displayName: 'Accra',
  //               route: 'Africa/Accra',
  //             },
  //             {
  //               displayName: 'Algiers',
  //               route: 'Africa/Algiers',
  //             },
  //             {
  //               displayName: 'Bissau',
  //               route: 'Africa/Bissau',
  //             },
  //             {
  //               displayName: 'Cairo',
  //               route: 'Africa/Cairo',
  //             },
  //             {
  //               displayName: 'Casablanca',
  //               route: 'Africa/Casablanca',
  //             },
  //           ],
  //         },
  //         {
  //           displayName: 'America',
  //           children: [
  //             {
  //               displayName: 'Adak',
  //               route: 'America/Adak',
  //             },
  //             {
  //               displayName: 'Anchorage',
  //               route: 'America/Adak',
  //             },
  //             {
  //               displayName: 'Araguaina',
  //               route: 'America/Araguaina',
  //             },
  //             {
  //               displayName: 'Argentina',
  //               children: [
  //                 {
  //                   displayName: 'Buenos_Aires',
  //                   route: 'America/Argentina/Buenos_Aires',
  //                 },
  //                 {
  //                   displayName: 'Catamarca',
  //                   route: 'America/Argentina/Catamarca',
  //                 },
  //                 {
  //                   displayName: 'Cordoba',
  //                   route: 'America/Argentina/Cordoba',
  //                 },
  //                 {
  //                   displayName: 'Jujuy',
  //                   route: 'America/Argentina/Jujuy',
  //                 },
  //                 {
  //                   displayName: 'La_Rioja',
  //                   route: 'America/Argentina/La_Rioja',
  //                 },
  //                 {
  //                   displayName: 'Mendoza',
  //                   route: 'America/Argentina/Mendoza',
  //                 },
  //               ],
  //             },
  //           ],
  //         },
  //         {
  //           displayName: 'Feedback',
  //           route: 'feedback',
  //         },
  //       ],
  //     },
  //   ];
  private navItems: NavItem[] = [];

  setNavItems(navItems: NavItem[]) {
    this.navItems = navItems;
    this.navItemsChanged.next(this.navItems);
    console.log(navItems);
  }

  getNavItems() {
    return this.navItems.slice();
  }
}
