import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { EventEmitter } from 'stream';
import { UploadFilesService } from './upload-files.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { filterResponse, uploadProgress } from '../shared/rxjs-operators';

declare global {
  interface Navigator {
      msSaveBlob?: (blob: any, defaultName?: string) => boolean
  }
}

@Component({
  selector: 'app-upload-files',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './upload-files.component.html',
  styleUrl: './upload-files.component.scss'
})
export class UploadFilesComponent implements OnInit {

  files!: Set<File>;
  progress = 0;

  constructor(
    private fb: FormBuilder,
    private service: UploadFilesService
  ){}

  ngOnInit(): void {

  }

  onChange(event: Event){
    console.log(event)

    const selectedFiles = (event.target as HTMLInputElement).files;
    console.log('selectedFiles', selectedFiles)
    if(selectedFiles !== null){
      const filesNames = [];
      this.files = new Set()
      for(let i = 0; i < selectedFiles.length; i++){
        filesNames.push(selectedFiles[i].name);
        console.log('filesNames', filesNames)
        this.files.add(selectedFiles[i]);
      }
      document.getElementById('formFile')!.innerHTML = filesNames.join(', ');
      this.progress = 0;
    }
  }

  onUpload(){
    if(this.files && this.files.size > 0){
      this.service.uploadFile(this.files, 'http://localhost:8080/upload')
      .pipe(
        uploadProgress(progress => {
          console.log(progress);
          this.progress = progress;
        }),
        filterResponse()
      ).subscribe(response => console.log('Upload concluido!'))
      /* .subscribe((event: HttpEvent<Object>) => {
        //HttpEventType
        console.log(event)
        if(event.type === HttpEventType.Response){
          console.log('Upload concluido!')
        }else if(event.type === HttpEventType.UploadProgress) {
          const percentDone = Math.round((event.loaded * 100) / event.total!)
          console.log(percentDone)
          this.progress = percentDone;
        }
      }) */
    }
  }


  onDownloadExcel(){
    this.service.downloadExcel('http://localhost:8080/downloadExcel')
    .subscribe((res: any) => {
      this.service.handleFile(res, 'report.xls')
    });
  }

  onDownloadPDF(){
    this.service.downloadPDF('http://localhost:8080/downloadPDF')
    .subscribe((res: any) => {
      this.service.handleFile(res, 'repot.pdf')
    });
  }

}
