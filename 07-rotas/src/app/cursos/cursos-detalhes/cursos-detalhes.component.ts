import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotFoundError, Subscription, isEmpty } from 'rxjs';
import { CursosService } from '../cursos.service';

@Component({
  selector: 'app-cursos-detalhes',
  templateUrl: './cursos-detalhes.component.html',
  styleUrls: ['./cursos-detalhes.component.scss'],
})
export class CursosDetalhesComponent implements OnInit, OnDestroy {
  id!: number;
  curso!: any;
  inscricao!: Subscription;

  constructor(
    private activateRouter: ActivatedRoute,
    private route: Router,
    private cursosSerivce: CursosService
  ) {}


  ngOnInit(): void {
    this.inscricao = this.activateRouter.params.subscribe((value: any) => {
      this.id = value['id'];
      this.curso = this.cursosSerivce.getCursosByID(this.id);
      if (this.curso == null) {
        this.route.navigate(['cursos/not-found']);
      }
    });
  }

  ngOnDestroy(): void {
    this.inscricao.unsubscribe;
  }
}
