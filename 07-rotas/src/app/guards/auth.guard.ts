import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../login/auth.service';
import { inject } from '@angular/core';


export const AuthGuard: CanActivateFn = (route, state) => {

  const auth = inject(AuthService)
  const router = inject(Router)

  if(auth.usuarioEstaAutenticado()){
    console.log('AuthGuard: Usuario autorizado')
    return true
  }

  router.navigate(['login'])

  return false;
};

