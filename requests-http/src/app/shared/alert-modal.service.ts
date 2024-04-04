import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertComponent } from '../cursos/cursos-lista/modals/alert/alert.component';
import { Router } from 'express';
import { ActivatedRouteSnapshot } from '@angular/router';

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

}
