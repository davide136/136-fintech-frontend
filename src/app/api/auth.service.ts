import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, of } from "rxjs";
import { catchError, mapTo, switchMap, take, tap } from "rxjs/operators";
import { environment } from "../../environments/environment";
import { User, UserStore } from "../core/stores/user.store";

type Credentials = {
  email: string,
  password: string,
  name: string,
  surname: string
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private userStore: UserStore,
  ) {
    this.httpClient.get<void>(`${environment.apiUrl}/csrf-token`).subscribe();
  }

  register(credentials: Credentials): Observable<boolean> {
    return this.httpClient.post<boolean>(`${environment.apiUrl}/register`, credentials);
  }

  logout(): void{
    this.userStore.removeUser();
    this.httpClient.get(`${environment.apiUrl}/logout`).subscribe();
    this.router.navigate(['/login']);
  }

  login(email: string, password: string): Observable<boolean> {

    return this.httpClient.post<boolean>(`${environment.apiUrl}/login`, {
      email,
      password
    }).pipe(
      switchMap(() => this.fetchUser()),
      mapTo(true),
      catchError(err => {
        this.router.navigateByUrl('/login');
        return of(false);
      })
    );

  }

  fetchUser(forceReload = false): Observable<User> {
    return this.userStore.user$.pipe(
      take(1),
      switchMap(user => {
        return (!!user && !forceReload)
          ? of(user)
          : this.httpClient.get<any>(`${environment.apiUrl}/me`, {}).pipe(
            tap(u => this.userStore.setUser(u))
          );
      })
    );
  }
}
