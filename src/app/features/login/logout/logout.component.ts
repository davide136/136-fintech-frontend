import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../api/auth.service';

@Component({
  selector: 'ac-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(
    private authSerivce: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  confirmLogout() {
    this.authSerivce.logout();
  }

  cancelLogout() {
    this.router.navigate(['/dashboard'])
  }
}
