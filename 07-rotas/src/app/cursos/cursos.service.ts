import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  constructor() { }

  cursoArray: any[] = [
    {id: 1, curso: 'Angular', nome: 'Professor Fulano', cpf: '544645646'},
    {id: 2, curso: 'Java', nome: 'Professor Fulano de Tal', cpf: '544645646'}
  ]

  getCursos(){
    return this.cursoArray;
  }

  getCursosByID(id: number){
    let cursos = this.cursoArray;

    for(let i = 0; i < cursos.length; i++){
      let curso = cursos[i];
      if(curso.id == id){
        return curso;
      }
    }
    return null;
  }

}
