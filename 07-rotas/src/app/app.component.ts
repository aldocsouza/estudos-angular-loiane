import { Component } from '@angular/core';
import { AuthService } from './login/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  pag!: number;
  title = '07-rotas';

  mostrarMenu: boolean = false;

  constructor(private authService: AuthService){}

  ngOnInit(){
    this.authService.mostraMenuEvento.subscribe(
      event => {
        this.mostrarMenu = event;
      }
    )
  }

}
