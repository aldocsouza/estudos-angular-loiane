import { Component, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-alert-confirm',
  standalone: true,
  imports: [],
  templateUrl: './alert-confirm.component.html',
  styleUrl: './alert-confirm.component.scss'
})
export class AlertConfirmComponent {

  @Input() titulo!: string;
  @Input() msg!: string;
  @Input() btnClose: string = 'Fechar'
  @Input() btnConfirm: string = 'Confirmar'
  modalRef?: BsModalRef;

  confirmModal?: Subject<Boolean>;

  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit() {
    this.confirmModal = new Subject();
  }

  onClose(){
    this.onConfirmOrDecline(false)
  }

  onConfirm(){
    this.onConfirmOrDecline(true)
  }

  onConfirmOrDecline(value: boolean){
    this.confirmModal?.next(value)
    this.bsModalRef.hide()
  }

}
