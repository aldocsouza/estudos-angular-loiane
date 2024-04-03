import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, Subscription, take, takeUntil, tap } from 'rxjs';
import { EnviarValorService } from '../enviar-valor.service';
import { PocBaseComponent } from '../poc-base/poc-base.component';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-unsub',
  standalone: true,
  imports: [
    PocBaseComponent,
    AsyncPipe
  ],
  template: `
    <app-poc-base [nome]="nome"
      [valor]="valor" estilo="text-bg-light">
    </app-poc-base>
  `
})
export class PocUnsubComponent implements OnInit, OnDestroy {

  nome = 'Componente com unsubscribe';
  valor!: string;

  sub: Subscription[] = [];

  constructor(private service: EnviarValorService) { }

  ngOnInit() {
    this.sub.push(this.service.getValor()
      .pipe(tap(v => console.log(this.nome, v)))
      .subscribe(novoValor => this.valor = novoValor));
  }

  ngOnDestroy() {
    this.sub.forEach(s => s.unsubscribe());
    console.log(`${this.nome} foi destruido`);
  }
}
