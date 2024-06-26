import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadFilesService {

  constructor(private http: HttpClient) { }

  uploadFile(file: Set<File>, url: string){
    const formData = new FormData();
    file.forEach(file => formData.append('file', file, file.name));
/*     const request = new HttpRequest('POST', url, formData);
    return this.http.request(request); */

    return this.http.post(url, formData, {
      observe: 'events',
      reportProgress: true
    })
  }

  downloadExcel(url: string){
    return this.http.get(url, {
      responseType: 'blob' as 'json'
    })
  }

  downloadPDF(url: string){
    return this.http.get(url, {
      responseType: 'blob' as 'json'
    })
  }

  handleFile(res: any, fileName: string){
    const file = new Blob([res], {
      type: res.type
    })

    //IE
    if(window.navigator && window.navigator.msSaveBlob){
      window.navigator.msSaveBlob(file)
      return;
    }

    const blob = window.URL.createObjectURL(file)
    const link = document.createElement('a')
    link.href = blob;
    link.download = fileName

    //link.click()
    window.dispatchEvent(new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window
    }))

    setTimeout(() => { //firefox
      window.URL.revokeObjectURL(blob)
      link.remove()
    }, 100)
  }

}
