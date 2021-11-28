import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ac-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  title = 'app';
  navLinks: any[];
  activeLinkIndex = -1;

  constructor(private router: Router) {
    this.navLinks = [
      {
        label: 'Home',
        link: './home',
        index: 0
      }, {
        label: 'Accedi',
        link: './sign-in',
        index: 1
      }, {
        label: 'Registrati',
        link: './register',
        index: 2
      },
      {
        label: 'Card',
        link: './card',
        index: 3
      },
      {
        label: 'Trasferisci',
        link: './transfer',
        index: 4
      },
      {
        label: 'Contatti',
        link: './contacts',
        index: 4
      },
    ];
  }
  ngOnInit(): void {
    this.router.events.subscribe(() => {
      this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === '.' + this.router.url));
    });
  }
}
