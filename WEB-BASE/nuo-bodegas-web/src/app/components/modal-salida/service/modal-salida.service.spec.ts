import { TestBed } from '@angular/core/testing';

import { ModalSalidaService } from './modal-salida.service';

describe('ModalSalidaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ModalSalidaService = TestBed.get(ModalSalidaService);
    expect(service).toBeTruthy();
  });
});
