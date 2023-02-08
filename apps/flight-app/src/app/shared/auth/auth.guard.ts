import { inject, Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  #auth = inject(AuthService);
  #router = inject(Router);

  canActivate(): boolean | UrlTree {
    if (this.#auth.username) {
      return true;
    }

    return this.#router.createUrlTree(['/home', { needsLogin: true }]);
  }
}
