import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-poc-base',
  standalone: true,
  imports: [],
  templateUrl: './poc-base.component.html',
  styleUrl: './poc-base.component.scss'
})
export class PocBaseComponent implements OnInit {

  @Input() nome!: string;
  @Input() valor!: string;
  @Input() estilo!: string;

  constructor() { }

  ngOnInit() {
  }
}
