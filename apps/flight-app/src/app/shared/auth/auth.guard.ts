import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
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
