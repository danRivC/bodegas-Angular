import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoProductoFormularioComponent } from './tipo-producto-formulario.component';

describe('TipoProductoFormularioComponent', () => {
  let component: TipoProductoFormularioComponent;
  let fixture: ComponentFixture<TipoProductoFormularioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoProductoFormularioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoProductoFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
