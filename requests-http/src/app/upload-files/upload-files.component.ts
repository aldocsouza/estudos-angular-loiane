import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { EventEmitter } from 'stream';
import { UploadFilesService } from './upload-files.service';

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
    }
  }

  onUpload(){
    if(this.files && this.files.size > 0){
      this.service.uploadFile(this.files, 'http://localhost:8080/upload')
      .subscribe(response => console.log('Upload concluido!'))
    }
  }


}
