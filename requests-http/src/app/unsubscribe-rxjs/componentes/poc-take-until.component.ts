import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, takeUntil, tap } from 'rxjs';
import { EnviarValorService } from '../enviar-valor.service';
import { PocBaseComponent } from '../poc-base/poc-base.component';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-take',
  standalone: true,
  imports: [
    PocBaseComponent,
    AsyncPipe
  ],
  template: `
    <app-poc-base [nome]="nome"
      [valor]="valor" estilo="text-bg-success">
    </app-poc-base>
  `
})
export class PocTakeUntilComponent implements OnInit, OnDestroy {

  nome = 'Componente com takeUntil';
  valor!: string;

  unsub$ = new Subject();

  constructor(private service: EnviarValorService) {}

  ngOnInit() {
    this.service.getValor()
      .pipe(
        tap(v => console.log(this.nome, v)),
        takeUntil(this.unsub$)
      )
      .subscribe(novoValor => this.valor = novoValor);
  }

  ngOnDestroy() {
    this.unsub$.next(1);
    this.unsub$.complete();
    console.log(`${this.nome} foi destruido`);
  }
}
