import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { EnviarValorService } from '../enviar-valor.service';
import { PocBaseComponent } from '../poc-base/poc-base.component';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-poc-async',
  standalone: true,
  imports: [
    PocBaseComponent,
    AsyncPipe
  ],
  template: `
  <app-poc-base
      [nome]="nome"
      [valor]="(valor$ | async) ?? ''"
      estilo="text-bg-secondary"
  ></app-poc-base>
  `
})
export class PocAsyncComponent implements OnInit, OnDestroy{
  nome = 'Componente com async';
  valor$!: Observable<string>;

  constructor(private service: EnviarValorService) { }


  ngOnInit() {
    this.valor$ = this.service.getValor()
    .pipe(
      tap( v => console.log(v))
    );
  }

  ngOnDestroy() {
    console.log(`${this.nome} foi destruido`);
  }
}
