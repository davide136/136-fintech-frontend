import {  Component } from '@angular/core';

@Component({
  selector: 'ac-root',
  template: `
    <ac-navbar></ac-navbar>
    <ac-container>
      <router-outlet>
      </router-outlet>
    </ac-container>
  `,
  styles: [`
    `]
})
export class AppComponent{
}
