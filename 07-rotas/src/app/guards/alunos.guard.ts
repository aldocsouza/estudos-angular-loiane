import { inject } from '@angular/core';
import { CanActivateChildFn } from '@angular/router';
import { AuthService } from '../login/auth.service';

export const AlunosGuard: CanActivateChildFn = (route, state) => {

  if(inject(AuthService).usuarioEstaAutenticado()){
    console.log('AlunosGuard: Usuario autenticado')
    return true;
  }

  if(state.url.includes('edit')){
    //return false;
  }

  return true;
};
