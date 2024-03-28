import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//import { CursosModule } from './cursos/cursos.module';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
//import { AlunosModule } from './alunos/alunos.module';
import { AuthService } from './login/auth.service';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada/pagina-nao-encontrada.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    PaginaNaoEncontradaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    //CursosModule,
    //AlunosModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
