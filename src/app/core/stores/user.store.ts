import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

export interface User {
  email: string;
  displayName: string;
  picture?: string;
}


@Injectable({
  providedIn: 'root'
})
export class UserStore {
  private loggedUser = new BehaviorSubject<User | null>(null);
  user$ = this.loggedUser.asObservable()
  constructor() { }

  setUser(user: User): void {
    this.loggedUser.next(user);
  }

  removeUser(): void {
    this.loggedUser.next(null);
  }
}
