import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnviarValorService {

  private emissor$ = new Subject<string>();


  novoValor(valor: string){
    this.emissor$.next(valor);
  }

  getValor(){
    return this.emissor$.asObservable();
  }

}
