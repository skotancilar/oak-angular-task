import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { TimesService } from '../../times.service';
import { NavItem } from '../nav-item';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss'],
})
export class MenuItemComponent implements OnInit {
  @Input() items!: NavItem[];
  @ViewChild('childMenu', { static: true }) public childMenu: any;

  constructor(public router: Router, private timeService: TimesService) {}

  ngOnInit() {}

  formatPath(path: any) {
    return path.split('/').join('&');
  }
}
