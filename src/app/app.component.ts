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

@Component({
  selector: 'ac-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  @ViewChild('drawer', { static: true }) drawer!: MatDrawer;
  navLinks: Link[]  = [
    {
      label: 'Home',
      icon: 'home',
      link: './home',
      index: 0
    }, {
      label: 'Accedi',
      icon: 'person',
      link: './sign-in',
      index: 1
    }, {
      label: 'Registrati',
      icon: 'person_add',
      link: './register',
      index: 2
    },
    {
      label: 'Card',
      icon: 'credit_card',
      link: './card',
      index: 3
    },
    {
      label: 'Trasferisci',
      icon: 'compare_arrows',
      link: './transfer',
      index: 4
    },
    {
      label: 'Contatti',
      icon: 'contacts',
      link: './contacts',
      index: 5
    },
    {
      label: 'Appuntamenti',
      icon: 'calendar_today',
      link: './appointments',
      index: 6
    },
  ];
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
