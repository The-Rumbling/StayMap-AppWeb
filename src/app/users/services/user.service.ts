import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { BaseService } from '../../shared/services/base.service';
import { User } from '../model/user.entity';
import { BehaviorSubject, catchError, map, retry } from 'rxjs';

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

  login(email: string, password: string) {
    return this.http.get<any>(this.resourcePath(), this.httpOptions).pipe(
      retry(2),
      catchError(this.handleError),
      map(response => {
        const users: User[] = response.users || [];
        const found = users.find(u => u.email === email && u.password === password);
        if (found) {
          localStorage.setItem('currentUser', JSON.stringify(found));
          this.currentUserSubject.next(found);
          return found;
        }
        return null;
      })
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
