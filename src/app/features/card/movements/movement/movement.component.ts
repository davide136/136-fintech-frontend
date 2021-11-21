import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ac-movement',
  templateUrl: './movement.component.html',
  styleUrls: ['./movement.component.scss']
})
export class MovementComponent implements OnInit {
  @Input() date: number = 0;
  @Input() amount: number = 0;
  @Input() type: string = 'out';
  @Input() title: string = "";
  @Input() descr: string = "";

  panelOpenState = false;

  constructor() { }

  ngOnInit(): void {
  }

  dateTime(timestamp: number): string { return ""; }

}
