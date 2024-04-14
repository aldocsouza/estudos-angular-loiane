import { NgFor, AsyncPipe } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Observable, map, tap, filter, EMPTY, distinctUntilChanged, debounceTime, switchMap } from 'rxjs';
import { AlertModalService } from '../shared/alert-modal.service';
import { SharedUiModule } from '../shared/shared-ui/shared-ui.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reactive-search',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor, AsyncPipe, SharedUiModule],
  templateUrl: './reactive-search.component.html',
  styleUrl: './reactive-search.component.scss'
})
export class ReactiveSearchComponent implements OnInit{

  queryField = new FormControl();
  readonly SEARCH_URL = "https://api.cdnjs.com/libraries";
  result$!: Observable<any>;
  total!: number;
  readonly FIELDS = 'name,description,version,homepage';

  constructor(
    private http: HttpClient,
    private alert: AlertModalService,
    private router: Router
  ){

  }

  ngOnInit(): void {

    this.result$ = this.queryField.valueChanges
      .pipe(
        map(value => value.trim()),
        filter(value => value.length > 1),
        debounceTime(100),
        distinctUntilChanged(),
        switchMap(value => this.http.get(this.SEARCH_URL, {
          params: {
            search: value,
            fields: this.FIELDS
          }
        })),
        tap((res: any) => this.total = res.total),
        map((res: any) => res.results)
      )

  }

  onSearch(){
    const fields = 'name,description,version,homepage';
    let value = this.queryField.value
    this.total = 0;
    if(value && value.trim() !== ''){

      const params_ = {
        search: value,
        fields: fields
      }

      let params = new HttpParams()
      .set('search', value)
      .set('fields', fields)

      this.result$ = this.http.get(this.SEARCH_URL, { params })
      .pipe(
        tap((res: any) => this.total = res.total),
        map((res: any) => res.results)
      )
      this.router.navigate(['/reactive-search'], { queryParams: { search: value }})
    }
  }

} //+ "?fields=name,description,version,homepage?search=angular"
