import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CursosComponent } from './cursos.component';
import { CursosDetalhesComponent } from './cursos-detalhes/cursos-detalhes.component';
import { CursoNaoEncontradoComponent } from './not-found/curso-nao-encontrado/curso-nao-encontrado.component';

const routes: Routes = [
  {
    path: '',
    component: CursosComponent
  },
  {
    path: 'not-found',
    component: CursoNaoEncontradoComponent
  },
  {
    path: ':id',
    component: CursosDetalhesComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CursosRoutingModule { }
