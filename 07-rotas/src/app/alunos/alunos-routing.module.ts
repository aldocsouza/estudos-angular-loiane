import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlunosComponent } from './alunos.component';
import { AlunosFormComponent } from './alunos-form/alunos-form.component';
import { AlunosDetalheComponent } from './alunos-detalhe/alunos-detalhe.component';
import { AlunoFormGuard } from '../guards/aluno-form.guard';
import { AlunoDetalheResolver } from './guards/aluno-detalhe.resolver';
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: AlunosComponent,
    children: [
      {
        path: 'novo',
        component: AlunosFormComponent
      },
      {
        path: ':id',
        component: AlunosDetalheComponent,
            resolve: { aluno : AlunoDetalheResolver }
      },
      {
        path: ':id/edit',
        component: AlunosFormComponent,
        canDeactivate: [AlunoFormGuard]
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlunosRoutingModule { }
