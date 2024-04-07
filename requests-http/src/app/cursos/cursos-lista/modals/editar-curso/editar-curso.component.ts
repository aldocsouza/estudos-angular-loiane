import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { CursosService } from '../../../cursos.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SharedUiModule } from '../../../../shared/shared-ui/shared-ui.module';
import { AlertComponent } from '../alert/alert.component';
import { AlertModalService } from '../../../../shared/alert-modal.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-editar-curso',
  standalone: true,
  imports: [NgFor, NgIf, NgClass, ReactiveFormsModule, AlertComponent],
  templateUrl: './editar-curso.component.html',
  styleUrl: './editar-curso.component.scss'
})
export class EditarCursoComponent implements OnInit {

  title?: string;
  closeBtnName?: string;
  id!: string;
  list: string[] = [];
  nomeCurso!: string;
  nome!: string;
  form!: FormGroup;
  cursoCadastrado: boolean = false;
  cursoAtualizado!: Subject<Boolean>;

  submitted = false;

  constructor(
    public bsModalRef: BsModalRef,
    private service: CursosService,
    private fb: FormBuilder,
    private alert: AlertModalService
  ) {}

  ngOnInit() {
    console.log(this.id)
    const curso = this.nomeCurso

    this.form = this.fb.group({
      curso: [curso, [Validators.required, Validators.minLength(3), Validators.maxLength(15)]]
    })
    this.getCurso();
    this.cursoAtualizado = new Subject()
    console.log(this.form.get('curso')?.value)
  }

  getCurso(){
    const curso = localStorage.getItem('dados')
    if(curso){
      this.form.get('curso')?.setValue(curso)
      localStorage.removeItem('dados');
    }
  }

  atualizarCurso(){
    const id = this.id;
    if(this.form.valid && this.form.dirty){
      this.alert.showConfirm('Confirmação', 'Tem certeza que deseja editar este curso?')?.asObservable()
      .subscribe(
        v=> {
          this.service.attCurso(id, this.form.value)
            .subscribe(c => {
              this.submitted = true;
              this.cursoCadastrado = true;
              this.bsModalRef.hide()
              this.cursoAtualizado.next(true);
              this.alert.showAlert('Curso editado com sucesso!', 'success')
            })
          }
      )
    }else{
      this.submitted = false
    }
  }


  hasError(field: string){
    return this.form.get(field)?.errors
  }

}
