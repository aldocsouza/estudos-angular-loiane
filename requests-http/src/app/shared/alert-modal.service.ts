import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertComponent } from '../cursos/cursos-lista/modals/alert/alert.component';
import { Router } from 'express';
import { ActivatedRouteSnapshot } from '@angular/router';
import { AlertConfirmComponent } from '../cursos/cursos-lista/modals/alert-confirm/alert-confirm.component';

@Injectable({
  providedIn: 'root'
})
export class AlertModalService {

  constructor(
    private modalService: BsModalService,

  ) { }

  showAlert(message: string, type: string){
    const modalRef: BsModalRef = this.modalService.show(AlertComponent);
    modalRef.content.type = type;
    modalRef.content.message = message;
  }

  showConfirm(titulo: string, msg: string, btnClose?: string, btnConfirm?: string) {
    const modalRef: BsModalRef = this.modalService.show(AlertConfirmComponent);
    const contentType = (<AlertConfirmComponent>modalRef.content)
    contentType.titulo = titulo;
    contentType.msg = msg;

    if (btnClose) {
      contentType.btnClose = btnClose
    }

    if (btnConfirm) {
      contentType.btnConfirm = btnConfirm;
    }

    return contentType.confirmModal;

  }

}
