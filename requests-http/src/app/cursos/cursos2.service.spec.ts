/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { Cursos2Service } from './cursos2.service';

describe('Service: Cursos2', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Cursos2Service]
    });
  });

  it('should ...', inject([Cursos2Service], (service: Cursos2Service) => {
    expect(service).toBeTruthy();
  }));
});
