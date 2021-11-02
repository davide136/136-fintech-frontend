import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ac-card',
  template: `
    <mat-card>
        <mat-card-header>
            <mat-card-title *ngIf='title'>{{title}}</mat-card-title>
            <mat-card-subtitle *ngIf='subtitle'>{{subtitle}}</mat-card-subtitle>
        </mat-card-header>
        <img matCardImage [src]='image'>
        <mat-card-content>
            <ng-content ></ng-content>
        </mat-card-content>
        <mat-card-footer *ngIf='footer'>{{footer}}</mat-card-footer>
    </mat-card>
  `,
  styles: [
  ]
})
export class CardComponent implements OnInit {
  @Input() title: string | undefined;
  @Input() subtitle: string | undefined;
  @Input() image: string | undefined;
  @Input() footer: string | undefined;

  constructor() { }

  ngOnInit(): void {
  }


}
