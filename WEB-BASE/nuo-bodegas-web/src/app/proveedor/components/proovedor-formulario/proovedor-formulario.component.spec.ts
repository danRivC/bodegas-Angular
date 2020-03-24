import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProovedorFormularioComponent } from './proovedor-formulario.component';

describe('ProovedorFormularioComponent', () => {
  let component: ProovedorFormularioComponent;
  let fixture: ComponentFixture<ProovedorFormularioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProovedorFormularioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProovedorFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
