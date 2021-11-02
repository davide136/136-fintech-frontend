import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ac-login',
  template: `
    <ng-container *ngIf=''>
      <div [ngSwitch]="">
        <ac-card *ngSwitchCase='"./signin"'
        [title]='"Enter your credentials"'>
          <ac-sign-in></ac-sign-in>
        </ac-card>
        <ac-card *ngSwitchCase='"./register"'
        [title]='"Enter your details"'>
          <ac-register></ac-register>
        </ac-card>
        <div *ngSwitchDefault></div>
      </div>
    </ng-container>
    <pre>{{activatedRoute}}</pre>
  `,
  styles: [
  ]
})
export class LoginComponent  {

  activatedRoute;
  constructor(activatedRoute: ActivatedRoute) {this.activatedRoute = activatedRoute;}

}
