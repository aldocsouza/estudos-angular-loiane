import type { ResolveFn } from '@angular/router';
import { CursosService } from '../cursos/cursos.service';
import { inject } from '@angular/core';
import { of } from 'rxjs';

export const cursosResolveResolver: ResolveFn<boolean> = (route, state) => {

  const service = inject(CursosService);

  if(route.params && route.params['id']){
  //service.listar()
  }

  return of();
};
