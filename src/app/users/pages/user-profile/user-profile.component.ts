import { Component } from '@angular/core';
import {UserService} from '../../services/user.service';
import {User} from '../../model/user.entity';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-profile',
  imports: [],
  standalone: true,
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {
  currentUser: User = new User({});
  constructor(private userService: UserService, private router: Router) {
    this.userService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }

  onLogout() {
    this.userService.logout();
    this.router.navigate(['/concerts']);
  }
}
