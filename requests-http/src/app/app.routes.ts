import { Routes } from '@angular/router';
import { Component } from '@angular/core';
import { CursosListaComponent } from './cursos/cursos-lista/cursos-lista.component';

export const routes: Routes = [
  {
    path: '', pathMatch: 'full', redirectTo: 'cursos'
  },
  {
    path: 'cursos',
    loadComponent: () => import('./cursos/cursos-lista/cursos-lista.component').then(mod => mod.CursosListaComponent),
  },
  {
    path: 'rxj-poc',
    loadComponent: () => import('./unsubscribe-rxjs/unsubscribe-poc/unsubscribe-poc.component').then(c => c.UnsubscribePocComponent)
  }
];
