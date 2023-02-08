import { Component, inject } from '@angular/core';
import { AuthService } from '../shared/auth/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  #auth = inject(AuthService);

  get username(): string {
    return this.#auth.username;
  }

  login(): void {
    this.#auth.login();
  }

  logout(): void {
    this.#auth.logout();
  }
}
