import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavItem } from '../modules/times/nested-menu/nav-item';
import { Timezone } from '../modules/times/time/timezone.model';
import { TimesService } from '../modules/times/times.service';

@Injectable({ providedIn: 'root' })
export class TimeDataService {
  navItems: string[] = [];
  isDataFetched = false;

  constructor(private http: HttpClient, private timeService: TimesService) {}

  fetchTimezones() {
    console.log('fetchtimezones');
    return this.http.get<any>('http://worldtimeapi.org/api/timezone');
  }

  fetchTimezone(timezone: string) {
    const url = `http://worldtimeapi.org/api/timezone/${timezone}`;
    return this.http.get<Timezone>(url);
  }

  convertArray(navItems: any) {
    if (navItems) {
      const paths = navItems.map((item: string) => {
        return item.split('/');
      });

      var tree;

      function arrangeIntoTree(paths: any, navItems: any) {
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
          let t = 0;
          while (t < array.length && array[t][key] !== value) {
            t++;
          }
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
