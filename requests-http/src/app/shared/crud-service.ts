import { HttpClient } from "@angular/common/http";
import { delay, take, tap } from "rxjs";

export class CrudService<T> {

  constructor(protected http: HttpClient, private API_URL: any) { }

  listar(){
    return this.http.get<T[]>(this.API_URL)
      .pipe(
        delay(500)
      )
  }

  postCurso(record: string){
    return this.http.post(this.API_URL, record).pipe(
      tap(c => console.log(c)),
      take(1)
    )
  }

  deleteCurso(id: string){
    return this.http.delete(`${this.API_URL}/${id}`)
    .pipe(
      take(1)
    )
  }

  attCurso(id: string, record: T){
    const body = {id, record}
    return this.http.put(`${this.API_URL}/${id}`, record)
    .pipe(
      take(1)
    )
  }

}
