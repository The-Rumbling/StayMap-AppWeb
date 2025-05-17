import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {BaseService} from '../../shared/services/base.service';
import {User} from '../model/user.entity';
import {BehaviorSubject, catchError, map, retry} from 'rxjs';

const usersResourceEndpointPath=environment.usersEndpointPath||'';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService<User>{

  private currentUserSubject = new BehaviorSubject<any>(this.getCurrentUser());
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor() {
    super();
    this.resourceEndpoint=usersResourceEndpointPath;
  }

  login(email:string, password:string) {
    const awr =${this.resourcePath()}?email=${email}&password=${password};
    console.log('lolazo', awr);
    return this.http.get<User[]>(${this.resourcePath()}?email=${email}&password=${password}, this.httpOptions).pipe(
      retry(2), catchError(this.handleError), map(users => {
        if (users.length) {
          const user = users[0];
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          return user;
        }
        return null;
      })
    );
  }

  logout() {
    sessionStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  getCurrentUser() {
    return JSON.parse(sessionStorage.getItem('currentUser') || 'null');
  }

  isLoggedIn(): boolean {
    return !!this.getCurrentUser();
  }
}
Estos son mis environments

export const environment = {
  production: true,
  // Server Base URL for Rest API
  serverBaseUrl: '',
   communityEndpointPath: 'assets/data/db.json',
  usersEndpointPath: 'assets/data/db.json'
};
