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

login(email: string, password: string) {
  return this.http.get<any>(this.resourcePath(), this.httpOptions).pipe(
    retry(2),
    catchError(this.handleError),
    map(data => {
      const users = data.users || [];
      const user = users.find((u: any) => u.email === email && u.password === password);

      if (user) {
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
