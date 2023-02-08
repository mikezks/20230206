import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  username = '';

  login(): void {
    this.username = 'Peter';
  }

  logout(): void {
    this.username = '';
  }
}
