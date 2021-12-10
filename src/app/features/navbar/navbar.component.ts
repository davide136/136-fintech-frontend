import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ac-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Input() navLinks: any[] = [];
  @Input() activeLinkIndex = -1;

  constructor() {}
  ngOnInit(): void {}
}
