import { Component, OnInit, TemplateRef } from '@angular/core';
import { PocBaseComponent } from '../poc-base/poc-base.component';
import { NgIf } from '@angular/common';
import { EnviarValorService } from '../enviar-valor.service';
import { PocComponent } from '../componentes/poc.component';
import { PocAsyncComponent } from '../componentes/poc-async.component';
import { PocTakeUntilComponent } from '../componentes/poc-take-until.component';
import { PocTakeComponent } from '../componentes/poc-take.component';
import { PocUnsubComponent } from '../componentes/poc-unsub.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-unsubscribe-poc',
  standalone: true,
  imports: [
    PocBaseComponent,
    PocComponent,
    PocAsyncComponent,
    PocTakeUntilComponent,
    PocTakeComponent,
    PocUnsubComponent,
    NgIf,
  ],
  templateUrl: './unsubscribe-poc.component.html',
  styleUrl: './unsubscribe-poc.component.scss'
})
export class UnsubscribePocComponent implements OnInit{
  mostrarComponentes = true;

  constructor(
    private service: EnviarValorService
  ){}

  exibirOrDestroy(){
    this.mostrarComponentes = !this.mostrarComponentes;
  }

  ngOnInit(): void {

  }

  novoValor(valor: string){
    this.service.novoValor(valor)
  }

  getValor(){
    return this.service.getValor()
  }

  visible: boolean = false;

  showDialog() {
        this.visible = true;
  }

}
