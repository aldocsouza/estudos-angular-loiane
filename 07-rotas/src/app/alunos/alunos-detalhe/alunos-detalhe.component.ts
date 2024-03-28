import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlunosService } from '../alunos.service';
import { Subscription } from 'rxjs';
import { Aluno } from '../aluno';

@Component({
  selector: 'app-alunos-detalhe',
  templateUrl: './alunos-detalhe.component.html',
  styleUrls: ['./alunos-detalhe.component.scss']
})
export class AlunosDetalheComponent implements OnInit, OnDestroy {

  id!: number;
  aluno!: Aluno;

  inscricao!: Subscription;

  constructor(
    private activatedRouter: ActivatedRoute,
    private alunosService: AlunosService
  ){}

  ngOnInit(){

    this.inscricao = this.activatedRouter.data.subscribe( ////// RESOLVER
      (data) => {
        console.log(data)
        this.aluno = data['aluno']
      }
    )

  }

  ngOnDestroy(){
    this.inscricao.unsubscribe;
  }


}
