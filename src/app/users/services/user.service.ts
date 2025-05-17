import { Injectable } from '@angular/core';
import { BaseService } from '../../shared/services/base.service';
import { User } from '../model/user.entity';
import { BehaviorSubject, catchError, map, of, retry } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService<User> {

  private currentUserSubject = new BehaviorSubject<User | null>(this.getCurrentUser());
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor() {
    super();
    this.resourceEndpoint = '/assets/data/db.json'; // Lee el archivo completo
  }

  override login(email: string, password: string) {
    return this.http.get<any>(this.resourcePath(), this.httpOptions).pipe(
      map(data => {
        const users = data.users || []; // 👈 accede a users del objeto
        const user = users.find((u: User) => u.email === email && u.password === password);
        if (user) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          return user;
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

  getCurrentUser(): User | null {
    return JSON.parse(localStorage.getItem('currentUser') || 'null');
  }

  isLoggedIn(): boolean {
    return !!this.getCurrentUser();
  }
}
