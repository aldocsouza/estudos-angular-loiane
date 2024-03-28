import { ResolveFn } from '@angular/router';
import { Aluno } from '../aluno';
import { inject } from '@angular/core';
import { AlunosService } from '../alunos.service';
import { Observable } from 'rxjs';


export const AlunoDetalheResolver: ResolveFn<Aluno | null> = (route, state) => {

  const  alunosService = inject(AlunosService);

  let id = route.params['id']

  return alunosService.getAluno(id);

};
