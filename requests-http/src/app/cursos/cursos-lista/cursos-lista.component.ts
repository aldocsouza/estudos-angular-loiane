import { Component, OnInit, TemplateRef } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CursosService } from '../cursos.service';
import { HttpClientModule } from '@angular/common/http';
import { AsyncPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Curso } from '../curso';
import {
  Observable,
  Subject,
  catchError,
  delay,
  empty,
  map,
  of,
  take,
  tap,
} from 'rxjs';
import { error } from 'console';
import {
  BsModalRef,
  BsModalService,
  ModalModule,
  ModalOptions,
} from 'ngx-bootstrap/modal';
import { NovoCursoComponent } from './modals/novo-curso/novo-curso.component';
import { SharedUiModule } from '../../shared/shared-ui/shared-ui.module';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AlertModalService } from '../../shared/alert-modal.service';
import { EditarCursoComponent } from './modals/editar-curso/editar-curso.component';
import { AlertComponent } from './modals/alert/alert.component';

@Component({
  selector: 'app-cursos-lista',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    NgFor,
    NgIf,
    AsyncPipe,
    SharedUiModule,
    FormsModule,
    ReactiveFormsModule,
    EditarCursoComponent,
    NgClass,
  ],
  templateUrl: './cursos-lista.component.html',
  styleUrl: './cursos-lista.component.scss',
})
export class CursosListaComponent implements OnInit {
  //cursos!: Curso[];
  cursos$!: Observable<Curso[]>;
  error$ = new Subject<boolean>();
  cursoCadastrado: boolean = false;

  formCurso!: FormGroup;
  submitted = false;

  constructor(
    private cursosService: CursosService,
    private modalService: BsModalService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.onRefresh();

    this.formCurso = this.fb.group({
      curso: [null, [Validators.required]],
    });
  }

  onRefresh() {
    this.cursos$ = this.cursosService.listar().pipe(
      catchError((error) => {
        console.error(error);
        this.error$.next(true);
        return empty();
      })
    );

    /*       this.cursosService.listar()
        .subscribe(
          v => {
            console.log(v)
          },
          error => {
            console.error(error)
            return empty();
        }) */
  }

  novoCurso() {
    console.log(this.formCurso.value);
    if (this.formCurso.valid) {
      this.cursosService
        .postCurso(this.formCurso.value)
        .pipe(take(1))
        .subscribe((sucess) => {
          this.submitted = true;
          this.cursoCadastrado = true;
          this.formCurso.reset();
          this.modalRef?.hide();
          this.onRefresh();
        });
    }else{
      this.submitted = false;
      this.cursoCadastrado = false;
      alert('Formulário inválido')
    }
  }


  deleteCurso(id: string) {
    this.cursosService
      .deleteCurso(id)
      .pipe(take(1))
      .subscribe((v) => this.onRefresh());
  }
  modalRef?: BsModalRef;

  atualizarCurso(id: string, curso: string) {
    this.modalRef = this.modalService.show(EditarCursoComponent);
    this.modalRef.content.closeBtnName = 'Fechar';
    this.modalRef.content.id = id;
    this.modalRef.content.nomeCurso = curso;
  }

  openModal(template: TemplateRef<void>) {
    this.modalRef = this.modalService.show(template);
  }
}
