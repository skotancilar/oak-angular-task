import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavItem } from '../modules/times/nested-menu/nav-item';
import { TimesService } from '../modules/times/times.service';

@Injectable({ providedIn: 'root' })
export class TimeDataService {
  constructor(private http: HttpClient, private timeService: TimesService) {}
  navItems: string[] = [];
  fetchTimezones() {
    this.http.get('http://worldtimeapi.org/api/timezone').subscribe(
      (res) => {
        this.navItems = Object.values(res);
        // console.log(JSON.stringify(this.convertArray(this.navItems), null, 4));

        const convertedNavItems: NavItem[] = [
          {
            displayName: 'TIMEZONES',
            children: [...this.convertArray(this.navItems)],
          },
        ];

        this.timeService.setNavItems(convertedNavItems);
        // console.log(convertedNavItems);
      },
      (err) => {
        console.log(err.message);
      }
    );
  }

  convertArray(navItems: any) {
    if (navItems) {
      const paths = this.navItems.map((item: string) => {
        return item.split('/');
      });

      var tree;

      function arrangeIntoTree(paths: any, navItems: any) {
        // Adapted from http://brandonclapp.com/arranging-an-array-of-flat-paths-into-a-json-tree-like-structure/
        var tree: any = [];

        for (var i = 0; i < paths.length; i++) {
          var path = paths[i];
          var currentLevel = tree;
          for (var j = 0; j < path.length; j++) {
            var part = path[j];

            var existingPath = findWhere(currentLevel, 'displayName', part);

            if (existingPath) {
              currentLevel = existingPath.children;
            } else {
              var newPart = {
                displayName: part,
                route: navItems[i],
                children: [],
              };

              currentLevel.push(newPart);
              if (newPart.children.length) {
                currentLevel = newPart.children;
              }
            }
          }
        }
        return tree;

        function findWhere(array: any, key: any, value: any) {
          // Adapted from https://stackoverflow.com/questions/32932994/findwhere-from-underscorejs-to-jquery
          let t = 0; // t is used as a counter
          while (t < array.length && array[t][key] !== value) {
            t++;
          } // find the index where the id is the as the aValue

          if (t < array.length) {
            return array[t];
          } else {
            return false;
          }
        }
      }
      return (tree = arrangeIntoTree(paths, navItems));
    }
  }
}
