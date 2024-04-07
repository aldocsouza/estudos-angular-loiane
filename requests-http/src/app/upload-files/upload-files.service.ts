import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UploadFilesService {

  constructor(private http: HttpClient) { }

  uploadFile(file: Set<File>, url: string){
    const formData = new FormData();
    file.forEach(file => formData.append('file', file, file.name));
    const request = new HttpRequest('POST', url, formData);
    return this.http.request(request);
  }

}
