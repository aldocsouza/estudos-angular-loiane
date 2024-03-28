import { Component, OnInit } from '@angular/core';
import { CursosService } from './cursos.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.scss']
})
export class CursosComponent implements OnInit{

  cursos!: any[];
  pagina!: number;

  constructor(
    private cursosService: CursosService,
    private router: Router,
    private routerActive: ActivatedRoute
    ){
  }

  ngOnInit(){
    this.cursos = this.cursosService.getCursos();

    this.routerActive.queryParams.subscribe(
      (query: any) => {
        this.pagina = query['pag'];
      }
    )
  }

  proximaPagina(){
    this.router.navigate(['/cursos'], {
      queryParams: {'pag': ++this.pagina}
    })
  }

}
