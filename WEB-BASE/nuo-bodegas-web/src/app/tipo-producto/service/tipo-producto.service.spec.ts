import { TestBed } from '@angular/core/testing';

import { TipoProductoService } from './tipo-producto.service';

describe('TipoProductoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TipoProductoService = TestBed.get(TipoProductoService);
    expect(service).toBeTruthy();
  });
});
