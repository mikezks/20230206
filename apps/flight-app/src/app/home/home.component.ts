import { ActivatedRoute } from '@angular/router';
import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth/auth.service';
import { map } from 'rxjs';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgIf, AsyncPipe],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  #auth = inject(AuthService);
  needsLogin$ = inject(ActivatedRoute).paramMap.pipe(
    map((params) => params.get('needsLogin') === 'true')
  );

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
