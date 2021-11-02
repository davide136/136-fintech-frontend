import { Component } from '@angular/core';

@Component({
  selector: 'ac-root',
  template: `
  <div class="container">
    <mat-toolbar color="primary" >
      <button mat-icon-button (click)="snav.toggle()"><mat-icon>menu</mat-icon></button>
      <span style="margin-left: 1rem">136 Fintech - Angular Academy 2021 - BETA</span>
    </mat-toolbar>

    <mat-sidenav-container >
      <mat-sidenav #snav [mode]='"over"'
                  fixedTopGap="56">
        <mat-nav-list>
          <a mat-list-item routerLink='login' (click)="snav.close()">Login</a>
          <a mat-list-item routerLink='login/signin' (click)="snav.close()">Sign In</a>
          <a mat-list-item routerLink='login/register' (click)="snav.close()">Register</a>
        </mat-nav-list>
      </mat-sidenav>
      <mat-sidenav-content>
        <router-outlet></router-outlet>
      </mat-sidenav-content>
    </mat-sidenav-container>

  </div>

  `,
  styles: [`
    .mat-list-item{
      padding: 2rem;
    }

    `]
})
export class AppComponent{
}
