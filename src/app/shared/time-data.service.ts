import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Timezone } from '../modules/times/time/timezone.model';
import { TimesService } from '../modules/times/times.service';

@Injectable({ providedIn: 'root' })
export class TimeDataService {
  navItems: string[] = [];
  isDataFetched = false;

  constructor(private http: HttpClient, private timeService: TimesService) {}

  fetchTimezones() {
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

      let tree;

      function arrangeIntoTree(paths: any, navItems: any) {
        let tree: any = [];

        for (let i = 0; i < paths.length; i++) {
          let path = paths[i];
          let currentLevel = tree;
          for (let j = 0; j < path.length; j++) {
            let part = path[j];

            let existingPath = findWhere(currentLevel, 'displayName', part);

            if (existingPath) {
              currentLevel = existingPath.children;
            } else {
              let newPart = {
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
