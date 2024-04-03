import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-novo-curso',
  standalone: true,
  imports: [],
  templateUrl: './novo-curso.component.html',
  styleUrl: './novo-curso.component.scss'
})
export class NovoCursoComponent {
  title?: string;
  closeBtnName?: string;
  list: string[] = [];

  constructor(public BsModalRef: BsModalRef) {}

  ngOnInit() {
    this.list.push('PROFIT!!!');
  }
}
