import {  Component, HostListener, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AuthService } from './api/auth.service';
import { User, UserStore } from './core/stores/user.store';

export type Link = {
  label: string,
  icon: string,
  link: string,
  index: number,
  user: string,
}

export const MIN_WIDTH_FOR_SHOWING_MENU = 900;
var loginMenu: Link[] = [
  {
    label: 'Accedi',
    icon: 'person',
    link: './login/sign-in',
    user: '',
    index: 0
  }, {
    label: 'Registrati',
    icon: 'person_add',
    link: './login/register',
    user: '',
    index: 1
  }
];
var appMenu: Link[] = [
  {
    label: 'Dashboard',
    icon: 'home',
    link: './dashboard',
    user: '',
    index: 0
  },
  {
    label: 'Carte',
    icon: 'credit_card',
    link: './dashboard/card',
    user: '',
    index: 1
  },
  {
    label: 'Movimenti',
    icon: 'receipt_long',
    link: './dashboard/movements',
    user: '',
    index: 2
  },
  {
    label: 'Trasferisci',
    icon: 'paid',
    link: './dashboard/transfer',
    user: '',
    index: 3
  },
  {
    label: 'Appuntamenti',
    icon: 'event',
    link: './dashboard/appointments',
    user: '',
    index: 4
  },
  {
    label: 'Tasse',
    icon: 'summarize',
    link: './dashboard/taxes',
    user: '',
    index: 5
  },
  {
    label: 'Logout',
    icon: 'contacts',
    link: './login/logout',
    user: '',
    index: 6
  },
];

@Component({
  selector: 'ac-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  @ViewChild('drawer', { static: true }) drawer!: MatDrawer;
  activeLinkIndex$ = new BehaviorSubject<number>(-1);
  getScreenWidth: number = 0;
  MIN_WIDTH_FOR_SHOWING_MENU = MIN_WIDTH_FOR_SHOWING_MENU;
  loggedUser$ = new BehaviorSubject<User | null>(null);
  navLinks$ = new BehaviorSubject<Link[]>(loginMenu);

  constructor(
    private router: Router,
    private userStore: UserStore,
  ) {    

  }


  ngOnInit() {
    this.getScreenWidth = window.innerWidth;
    if (this.getScreenWidth != 0 && this.getScreenWidth < 800)
      this.drawer.toggle(false);
    else
      this.drawer.toggle(true);

    this.router.events.subscribe(() => {
      this.activeLinkIndex$.next(this.navLinks$.value.indexOf(
        this.navLinks$.value.find(tab => tab.link === '.' + this.router.url)!));
    });
    this.userStore.user$.pipe(
      map(user => {
        this.activeLinkIndex$.next(-1);
        this.loggedUser$.next(user);
        if (user) {
          appMenu[6].user = user.displayName;
          this.navLinks$.next(appMenu);
        }
        else {
          appMenu[6].user = '';
          this.navLinks$.next(loginMenu);
        }
      })
    ).subscribe()
  }

  @HostListener('window:resize', ['$event'])

  onWindowResize() {
    this.getScreenWidth = window.innerWidth;
    if (this.getScreenWidth != 0 && this.getScreenWidth < MIN_WIDTH_FOR_SHOWING_MENU)
      this.drawer.toggle(false);
    else
      this.drawer.toggle(true);
  }
}
