import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSalidaComponent } from './modal-salida.component';

describe('ModalSalidaComponent', () => {
  let component: ModalSalidaComponent;
  let fixture: ComponentFixture<ModalSalidaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalSalidaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSalidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
