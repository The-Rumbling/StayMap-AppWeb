import { Component } from '@angular/core';
import {NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {NgForOf, NgIf} from '@angular/common';
import {MatToolbar} from '@angular/material/toolbar';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatFormField, MatInput, MatLabel, MatSuffix} from '@angular/material/input';
import {filter} from 'rxjs';
import {UserService} from './users/services/user.service';
import {User} from './users/model/user.entity';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLinkActive, RouterLink, NgForOf, MatToolbar, MatFormField, MatLabel, MatButton, MatIconButton, MatInput, MatSuffix, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'learning-center';
  currentUser:User = new User({});
  isLoggedIn:boolean = false;
  showToolbar = true;
  options = [
    {link: 'concerts', label: 'Concerts' },
    { link: 'map', label: 'Map' },
    { link: 'communities', label: 'Communities' },
  ]

  constructor(private translate:  TranslateService, private router:Router, private userService: UserService) {
    this.userService.currentUser$.subscribe(user => {
      this.currentUser = user;
      this.isLoggedIn = !!user;
    })
    this.translate.setDefaultLang('en');
    this.translate.use('en');
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.showToolbar = !(event.url.includes('/login') || event.url.includes('/register'));
      });
  }
}
