import {  Component, HostListener, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from '@angular/router';

export type Link = {
  label: string,
  icon: string,
  link: string,
  index: number
}

export const MIN_WIDTH_FOR_SHOWING_MENU = 900;
var loginMenu: Link[] = [
  {
    label: 'Dashboard',
    icon: 'home',
    link: './dashboard',
    index: 0
  },
  {
    label: 'Accedi',
    icon: 'person',
    link: './login/sign-in',
    index: 1
  }, {
    label: 'Registrati',
    icon: 'person_add',
    link: './login/register',
    index: 2
  }
];
var appMenu: Link[] = [
  {
    label: 'Dashboard',
    icon: 'home',
    link: './dashboard',
    index: 0
  },
  {
    label: 'Carte',
    icon: 'credit_card',
    link: './dashboard/card',
    index: 1
  },
  {
    label: 'Movimenti',
    icon: 'receipt_long',
    link: './dashboard/movements',
    index: 1
  },
  {
    label: 'Trasferisci',
    icon: 'paid',
    link: './dashboard/transfer',
    index: 2
  },
  {
    label: 'Appuntamenti',
    icon: 'event',
    link: './dashboard/appointments',
    index: 3
  },
  {
    label: 'Tasse',
    icon: 'summarize',
    link: './dashboard/contacts',
    index: 4
  },
  {
    label: 'Logout',
    icon: 'contacts',
    link: './dashboard/logout',
    index: 5
  },
];

@Component({
  selector: 'ac-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  @ViewChild('drawer', { static: true }) drawer!: MatDrawer;
  navLinks: Link[] = appMenu;
  activeLinkIndex = -1;
  getScreenWidth: number = 0;
  MIN_WIDTH_FOR_SHOWING_MENU = MIN_WIDTH_FOR_SHOWING_MENU;

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === '.' + this.router.url)!);
    });
  }


  ngOnInit() {
    this.getScreenWidth = window.innerWidth;
    if (this.getScreenWidth != 0 && this.getScreenWidth < 800)
      this.drawer.toggle(false);
    else
      this.drawer.toggle(true);
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
