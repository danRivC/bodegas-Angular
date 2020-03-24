import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalidaDetalleComponent } from './salida-detalle.component';

describe('SalidaDetalleComponent', () => {
  let component: SalidaDetalleComponent;
  let fixture: ComponentFixture<SalidaDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalidaDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalidaDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
