import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ac-movement',
  templateUrl: './movement.component.html',
  styleUrls: ['./movement.component.scss']
})
export class MovementComponent implements OnInit {
  @Input() date: string = "";
  @Input() amount: number = 0;
  @Input() type: string = 'out';
  @Input() title: string = "";
  @Input() descr: string = "";

  panelOpenState = false;

  constructor() { }

  ngOnInit(): void {
  }

}
