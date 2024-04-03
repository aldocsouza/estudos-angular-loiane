import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, take, takeUntil, tap } from 'rxjs';
import { EnviarValorService } from '../enviar-valor.service';
import { PocBaseComponent } from '../poc-base/poc-base.component';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-take-until',
  standalone: true,
  imports: [
    PocBaseComponent,
    AsyncPipe
  ],
  template: `
    <app-poc-base [nome]="nome"
      [valor]="valor" estilo="text-bg-info">
    </app-poc-base>
  `
})
export class PocTakeComponent implements OnInit, OnDestroy {

  nome = 'Componente com take';
  valor!: string;

  constructor(private service: EnviarValorService) {}

  ngOnInit() {
    this.service.getValor()
      .pipe(
        tap(v => console.log(this.nome, v)),
        take(1)
      )
      .subscribe(novoValor => this.valor = novoValor);
  }

  ngOnDestroy() {
    console.log(`${this.nome} foi destruido`);
  }
}
