import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { EnviarValorService } from '../enviar-valor.service';
import { PocBaseComponent } from '../poc-base/poc-base.component';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-poc',
  standalone: true,
  imports: [
    PocBaseComponent,
    AsyncPipe
  ],
  template: `
    <app-poc-base
    [nome]="nome"
    [valor]="valor"
    estilo="text-bg-primary"
    ></app-poc-base>
  `
})
export class PocComponent implements OnInit, OnDestroy{

  nome: string = 'Componente sem unsubscribe';
  valor!: string;

  constructor(private service: EnviarValorService) { }


  ngOnInit() {
    this.service.getValor()
      .pipe(tap(v => console.log(this.nome, v)))
      .subscribe(valor => this.valor = valor);
  }

  ngOnDestroy() {
    console.log(`${this.nome} foi destruido`);
  }
}
