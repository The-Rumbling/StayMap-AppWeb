import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { BaseService } from '../../shared/services/base.service';
import { User } from '../model/user.entity';
import { BehaviorSubject, catchError, map, of, retry } from 'rxjs';

const usersResourceEndpointPath = environment.usersEndpointPath || '';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService<User> {

  private currentUserSubject = new BehaviorSubject<any>(this.getCurrentUser());
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor() {
    super();
    this.resourceEndpoint = usersResourceEndpointPath;
  }

  override login(email: string, password: string) {
    return this.http.get<any>(this.resourcePath(), this.httpOptions).pipe(
      map(data => {
        const usersArray = Array.isArray(data)
          ? data
          : data.users || [];

        const user = usersArray.find((u: any) => u.email === email && u.password === password);

        if (user) {
          const parsedUser = new User(user);
          localStorage.setItem('currentUser', JSON.stringify(parsedUser));
          this.currentUserSubject.next(parsedUser);
          return parsedUser;
        }

        return null;
      }),
      catchError(this.handleError)
    );
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser') || 'null');
  }

  isLoggedIn(): boolean {
    return !!this.getCurrentUser();
  }
}
