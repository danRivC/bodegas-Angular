import { TestBed } from '@angular/core/testing';

import { ModalMovimientoService } from './modal-movimiento.service';

describe('ModalMovimientoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ModalMovimientoService = TestBed.get(ModalMovimientoService);
    expect(service).toBeTruthy();
  });
});
