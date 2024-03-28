import { Component } from '@angular/core';
import { Usuario } from './usuario';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  valor!: string;

  usuario: Usuario = new Usuario();


  constructor(private authService: AuthService){
  }

  fazerLogin(){
    this.authService.authUsuario(this.usuario);
  }

}
