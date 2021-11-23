import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  recoverPassword(email: string): Observable<void> {
    return new Observable<void>(observer => {
      setTimeout(() => {
        if (email === 'error@gmail.com') {
          observer.error({ message: 'Email not found' });
        }
        observer.next();
        observer.complete();
      }, 3000);
    });
  }

  loggingIn(email: string, password: string): Observable<User> {
    return new Observable<User>(observer => {
      setTimeout(() => {
        if (email === 'error@gmail.com') {
          observer.error({ message: 'User not found' });
          observer.next();
        } else {
          const user = new User();
          user.email = email;
          user.userId = 'user1';
          observer.next();
        }
        observer.complete();
      }, 3000);
    });
  }
}
