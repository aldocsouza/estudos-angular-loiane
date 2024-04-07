import {
  Component,
  ElementRef,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CursosService } from '../cursos.service';
import { HttpClientModule } from '@angular/common/http';
import { AsyncPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Curso } from '../curso';
import {
  EMPTY,
  Observable,
  Subject,
  catchError,
  delay,
  empty,
  map,
  of,
  switchMap,
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
import { Cursos2Service } from '../cursos2.service';

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
  modalRef?: BsModalRef;
  deleteModalRef?: BsModalRef;
  dadosCurso!: string;

  testeInput = new FormControl('Valor');

  @ViewChild('deleteModal') deleteModal!: any;

  formCurso!: FormGroup;
  submitted = false;

  constructor(
    private cursosService: Cursos2Service,
    private modalService: BsModalService,
    private fb: FormBuilder,
    private alert: AlertModalService
  ) { }

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
          this.alert.showAlert('Curso salvo com sucesso!', 'success');
        });
    } else {
      this.submitted = false;
      this.cursoCadastrado = false;
      this.alert.showAlert('Formulário inválido!', 'danger');
    }
  }

  teste() {
    this.alert.showConfirm(
      'Confirmação',
      'Tem certeza que deseja remover o curso?'
    );
  }

  onDelete(curso: Curso) {
    this.deleteModalRef = this.modalService.show(this.deleteModal, {
      class: 'modal-sm',
    });
    this.dadosCurso = curso.id;
  }

  onConfirm() {
    const id = this.dadosCurso;
    this.cursosService
      .deleteCurso(id)
      .pipe(take(1))
      .subscribe((v) => {
        this.deleteModalRef?.hide();
        this.alert.showAlert('Curso removido com sucesso!', 'danger');
        this.onRefresh();
      });
  }

  onDecline() {
    this.deleteModalRef?.hide();
  }

  deleteCurso(curso: Curso) {
    const result$ = this.alert.showConfirm(
      'Confirmação',
      'Tem certeza que deseja remover o curso?'
    );
    result$
      ?.asObservable()
      .pipe(
        take(1),
        switchMap((result) =>
          result ? this.cursosService.deleteCurso(curso.id) : EMPTY
        )
      )
      .subscribe((v) => {
        this.alert.showAlert('Curso removido com sucesso!', 'danger');
        this.onRefresh();
      });
  }

  atualizarCurso(id: string, curso: string) {
    localStorage.setItem('dados', curso);
    const modalRef: BsModalRef = this.modalService.show(EditarCursoComponent);
    const content = <EditarCursoComponent>modalRef.content;
    content.closeBtnName = 'Fechar';
    content.id = id;
    content.nomeCurso = curso;
    content.cursoAtualizado
      .asObservable()
      .subscribe((v) => (v ? this.onRefresh() : EMPTY));
  }

  openModal(template: TemplateRef<void>) {
    this.modalRef = this.modalService.show(template);
  }
}
