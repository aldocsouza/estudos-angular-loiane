import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveSearchComponent } from './reactive-search.component';

describe('ReactiveSearchComponent', () => {
  let component: ReactiveSearchComponent;
  let fixture: ComponentFixture<ReactiveSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveSearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReactiveSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
