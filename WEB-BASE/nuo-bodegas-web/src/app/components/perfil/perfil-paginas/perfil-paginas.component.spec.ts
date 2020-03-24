import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilPaginasComponent } from './perfil-paginas.component';

describe('PerfilPaginasComponent', () => {
  let component: PerfilPaginasComponent;
  let fixture: ComponentFixture<PerfilPaginasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerfilPaginasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilPaginasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
