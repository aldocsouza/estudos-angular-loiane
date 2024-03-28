import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlunosService } from '../alunos.service';
import { Subscription } from 'rxjs';
import { IFormCanDeactivate } from 'src/app/guards/iform-candeactivate';
import { Aluno } from '../aluno';

@Component({
  selector: 'app-alunos-form',
  templateUrl: './alunos-form.component.html',
  styleUrls: ['./alunos-form.component.scss'],
})
export class AlunosFormComponent implements IFormCanDeactivate {
  aluno!: Aluno;
  id!: number;
  url!: any;
  inscricao!: Subscription;
  inputMudou: boolean = false;

  constructor(
    private activatedRouter: ActivatedRoute,
    private alunosService: AlunosService
  ) {}

  ngOnInit() {
    this.inscricao = this.activatedRouter.params.subscribe(
      (value: any) => {
        this.id = value['id'];

        const alunoData = this.alunosService.getAluno(this.id)
        if (alunoData !== null){
          this.aluno = alunoData;
        }
      }
    );

/*     this.inscricao = this.activatedRouter.data.subscribe(
      (data) => {
        console.log(data)
      }
    ) */

    this.url = this.activatedRouter.snapshot.url.join('/');
  }

  ngOnDestroy() {
    this.inscricao.unsubscribe;
  }

  inputDeactivate() {
    if (!this.inputMudou) {
      confirm(
        'Você tem certeza que deseja sair desta página? Todos os dados não seram salvos.'
      );
    }
    return false;
  }

  podeDesativar(): void {
      this.inputDeactivate();
  }


}
