import { Routes } from '@angular/router';
import {CommunityManagementComponent} from './community/pages/community-management/community-management.component';
import {ConcertViewComponent} from './concerts/pages/concert-view/concert-view.component';
import {ConcertMapComponent} from './concerts/pages/concert-map/concert-map.component';
import {LoginComponent} from './public/pages/login/login.component';
import {RegisterComponent} from './public/pages/register/register.component';
import {UserProfileComponent} from './users/pages/user-profile/user-profile.component';

export const routes: Routes = [
  { path: 'communities',  component: CommunityManagementComponent },
  { path: 'map', component:  ConcertMapComponent },
   { path: 'concerts', component:  ConcertViewComponent },
  { path: 'login', component:  LoginComponent },
  { path: 'register', component: RegisterComponent }

];
