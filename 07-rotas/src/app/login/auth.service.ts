import { EventEmitter, Injectable } from '@angular/core';
import { Usuario } from './usuario';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  usuarioAuthenticado: boolean = false;

  mostraMenuEvento = new EventEmitter<boolean>();

  constructor(private router: Router) { }

  authUsuario(usuario: Usuario){
    if(usuario.nome === 'usuario@email.com' && usuario.senha === '123456'){
      this.usuarioAuthenticado = true;
      this.mostraMenuEvento.emit(true);
      this.router.navigate(['/'])
    }else{
      this.usuarioAuthenticado = false;
      this.mostraMenuEvento.emit(false);
      alert('Usuario ou senha incorretos!!')
    }
  }

  usuarioEstaAutenticado(){
    return this.usuarioAuthenticado;
  }

}
