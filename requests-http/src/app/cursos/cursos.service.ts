import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Curso } from './curso';
import { delay, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
  useFactory: (http: HttpClient) => new CursosService(http),
  deps: [HttpClient]
})
export class CursosService {

  private readonly baseUrl = 'http://localhost:3000/cursos';

  constructor(
    private http: HttpClient
  ) { }

  listar(){
    return this.http.get<Curso[]>(this.baseUrl)
      .pipe(
        delay(500)
      )
  }

  postCurso(curso: string){
    return this.http.post(this.baseUrl, curso).pipe(
      tap(c => console.log(c))
    )
  }

  deleteCurso(id: string){
    return this.http.delete(`${this.baseUrl}/${id}`)
  }

}
