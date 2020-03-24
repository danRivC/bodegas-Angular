import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UbicacionFormularioComponent } from './ubicacion-formulario.component';

describe('UbicacionFormularioComponent', () => {
  let component: UbicacionFormularioComponent;
  let fixture: ComponentFixture<UbicacionFormularioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UbicacionFormularioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UbicacionFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
