import { NgModule } from '@angular/core';

import { RouterModule, Routes, CanMatchFn } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { CursosGuard } from './guards/cursos.guard';
import { AlunosGuard } from './guards/alunos.guard';
import { AuthLoadGuard } from './guards/authload.guard';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada/pagina-nao-encontrada.component';


const routes: Routes = [

  {
    path: 'cursos',
      loadChildren: () => import('../app/cursos/cursos.module').then(m => m.CursosModule),
      canActivate: [AuthGuard],
      canActivateChild: [CursosGuard],
      canMatch: [AuthLoadGuard]
  },
  {
    path: 'alunos',
    loadChildren: () => import('../app/alunos/alunos.module').then(m => m.AlunosModule),
    canActivate: [AuthGuard],
    canActivateChild: [AlunosGuard],
    canMatch: [AuthLoadGuard]
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
