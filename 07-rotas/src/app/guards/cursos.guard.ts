import { inject } from '@angular/core';
import { CanActivateChildFn } from '@angular/router';
import { AuthService } from '../login/auth.service';

export const CursosGuard: CanActivateChildFn = (route, state) => {

  if(inject(AuthService).usuarioEstaAutenticado()){
    console.log('CursosGuard - CanActivateChildFn: Usuario autorizado')
    return true;
  }


  return true;
};
