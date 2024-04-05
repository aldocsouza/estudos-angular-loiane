import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { CursosService } from '../../../cursos.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SharedUiModule } from '../../../../shared/shared-ui/shared-ui.module';
import { AlertComponent } from '../alert/alert.component';
import { AlertModalService } from '../../../../shared/alert-modal.service';

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
  form!: FormGroup;
  cursoCadastrado: boolean = false;

  submitted = false;

  constructor(
    public bsModalRef: BsModalRef,
    private service: CursosService,
    private fb: FormBuilder,
    private alert: AlertModalService
  ) {}

  ngOnInit() {
    this.list.push('PROFIT!!!');
    console.log(this.id)
    const curso = this.nomeCurso

    this.form = this.fb.group({
      curso: [curso, [Validators.required, Validators.minLength(3), Validators.maxLength(8)]]
    })

    console.log(this.form.get('curso')?.value)
  }

  atualizarCurso(){
    const id = this.id;
    if(this.form.valid){
    this.service.attCurso(id, this.form.value)
      .subscribe(c => {
        this.submitted = true;
        this.cursoCadastrado = true;
        this.bsModalRef.hide()
        this.alert.showAlert('Curso editado com sucesso!', 'success')
      })
    }else{
      this.submitted = false
    }
  }


  hasError(field: string){
    return this.form.get(field)?.errors
  }

}
