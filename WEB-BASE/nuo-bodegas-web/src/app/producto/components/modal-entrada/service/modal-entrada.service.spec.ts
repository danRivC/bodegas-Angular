import { TestBed } from '@angular/core/testing';

import { ModalEntradaService } from './modal-entrada.service';

describe('ModalEntradaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ModalEntradaService = TestBed.get(ModalEntradaService);
    expect(service).toBeTruthy();
  });
});
