import { CanMatchFn } from '@angular/router';
import { AlunosService } from '../alunos/alunos.service';
import { inject } from '@angular/core';
import { AuthService } from '../login/auth.service';

export const AuthLoadGuard: CanMatchFn = (route, segments) => {

  if(inject(AuthService).usuarioEstaAutenticado()){
    console.log('AuthLoadGuard CanMatchFn: Usuario autorizado')
    return true;
  }


  return false;

};
