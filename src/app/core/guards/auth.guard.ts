import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, mapTo, take } from 'rxjs/operators';
import { AuthService } from '../../api/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate, CanActivateChild  {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivateChild(){
    return this.canActivate();
  }

  canActivate(): Observable<boolean> {
    // Controlla se c'è l'utente
    return this.authService.fetchUser().pipe(
      take(1),
      // Se non abbiamo errori ritorniamo true
      mapTo(true),
      // Se abbiamo un errore navighiamo al login e ritorniamo false
      catchError(() => {
        this.router.navigateByUrl('/login');
        return of(false);
      })
    );
  }
}
