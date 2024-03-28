import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursosDetalhesComponent } from './cursos-detalhes.component';

describe('CursosDetalhesComponent', () => {
  let component: CursosDetalhesComponent;
  let fixture: ComponentFixture<CursosDetalhesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CursosDetalhesComponent]
    });
    fixture = TestBed.createComponent(CursosDetalhesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
