import { Component, Input, OnInit } from '@angular/core';
import { Link } from '../../app.component';

@Component({
  selector: 'ac-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Input() navLinks: Link[] | null = [];
  @Input() activeLinkIndex = -1;

  constructor() {}
  ngOnInit(): void {}
}
