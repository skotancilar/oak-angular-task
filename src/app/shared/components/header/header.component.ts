import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() toggleSideBar: EventEmitter<any> = new EventEmitter();

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {}

  toggleSidebar() {
    this.toggleSideBar.emit();
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['auth']);
  }
}
