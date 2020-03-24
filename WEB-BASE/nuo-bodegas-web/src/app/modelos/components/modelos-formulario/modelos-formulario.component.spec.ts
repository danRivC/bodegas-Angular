import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelosFormularioComponent } from './modelos-formulario.component';

describe('ModelosFormularioComponent', () => {
  let component: ModelosFormularioComponent;
  let fixture: ComponentFixture<ModelosFormularioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelosFormularioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelosFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
