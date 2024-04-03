import { TestBed } from '@angular/core/testing';

import { EnviarValorService } from './enviar-valor.service';

describe('EnviarValorService', () => {
  let service: EnviarValorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnviarValorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
