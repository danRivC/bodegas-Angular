import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalMovimientoComponent } from './modal-movimiento.component';

describe('ModalMovimientoComponent', () => {
  let component: ModalMovimientoComponent;
  let fixture: ComponentFixture<ModalMovimientoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalMovimientoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalMovimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
