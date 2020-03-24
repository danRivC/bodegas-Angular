import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KardexDetalleComponent } from './kardex-detalle.component';

describe('KardexDetalleComponent', () => {
  let component: KardexDetalleComponent;
  let fixture: ComponentFixture<KardexDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KardexDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KardexDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
