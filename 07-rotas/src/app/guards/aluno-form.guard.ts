import { CanDeactivateFn } from '@angular/router';
import { AlunosFormComponent } from '../alunos/alunos-form/alunos-form.component';
import { IFormCanDeactivate } from './iform-candeactivate';

export const AlunoFormGuard: CanDeactivateFn<IFormCanDeactivate> = (component, currentRoute, currentState, nextState) => {

  console.log('Guarda Deactivate');

  component.podeDesativar()

  return true;
};
