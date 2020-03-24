import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CiudadFormularioComponent } from './ciudad-formulario.component';

describe('CiudadFormularioComponent', () => {
  let component: CiudadFormularioComponent;
  let fixture: ComponentFixture<CiudadFormularioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CiudadFormularioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CiudadFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
