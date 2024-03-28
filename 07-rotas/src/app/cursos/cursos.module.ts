import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CursosDetalhesComponent } from './cursos-detalhes/cursos-detalhes.component';
import { CursosComponent } from './cursos.component';
import { CursosService } from './cursos.service';
import { CursoNaoEncontradoComponent } from './not-found/curso-nao-encontrado/curso-nao-encontrado.component';
import { CursosRoutingModule } from './cursos-routing.module';



@NgModule({
  declarations: [
    CursosComponent,
    CursosDetalhesComponent,
    CursoNaoEncontradoComponent
  ],
  imports: [
    CommonModule,
    CursosRoutingModule
  ],
  providers: [
    CursosService
  ]
})
export class CursosModule { }
