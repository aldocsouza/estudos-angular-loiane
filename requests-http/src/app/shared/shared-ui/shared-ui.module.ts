import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AlertModalService } from '../alert-modal.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ModalModule.forRoot()
  ],
  exports: [
    ModalModule
  ],
  providers: [
    AlertModalService
  ]
})
export class SharedUiModule { }
