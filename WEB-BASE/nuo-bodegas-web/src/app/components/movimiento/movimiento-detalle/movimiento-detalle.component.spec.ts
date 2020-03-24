import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovimientoDetalleComponent } from './movimiento-detalle.component';

describe('MovimientoDetalleComponent', () => {
  let component: MovimientoDetalleComponent;
  let fixture: ComponentFixture<MovimientoDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovimientoDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovimientoDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
