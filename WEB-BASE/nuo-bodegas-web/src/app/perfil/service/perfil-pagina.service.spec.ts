import { TestBed } from '@angular/core/testing';

import { PerfilPaginaService } from './perfil-pagina.service';

describe('PerfilPaginaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PerfilPaginaService = TestBed.get(PerfilPaginaService);
    expect(service).toBeTruthy();
  });
});
