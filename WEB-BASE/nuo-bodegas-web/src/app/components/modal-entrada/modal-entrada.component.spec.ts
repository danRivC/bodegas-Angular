import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEntradaComponent } from './modal-entrada.component';

describe('ModalEntradaComponent', () => {
  let component: ModalEntradaComponent;
  let fixture: ComponentFixture<ModalEntradaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalEntradaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEntradaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
