import {Component, inject} from '@angular/core';
import {Router} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {BehaviorSubject} from 'rxjs';
import {UserService} from '../../../users/services/user.service';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email:string="";
  password:string="";
  userService=inject(UserService);
  constructor(private router: Router) {}

  onLogin() {
    this.userService.login(this.email, this.password).subscribe(user => {
      if (user) {
        sessionStorage.setItem('currentUser', JSON.stringify(user));
        this.router.navigate(['/concerts']);
      } else {
        alert('Invalid email or password');
      }
    });
  }
}
