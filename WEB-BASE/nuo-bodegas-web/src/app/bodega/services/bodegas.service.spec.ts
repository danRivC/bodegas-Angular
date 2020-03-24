import { TestBed } from '@angular/core/testing';

import { BodegasService } from './bodegas.service';

describe('BodegasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BodegasService = TestBed.get(BodegasService);
    expect(service).toBeTruthy();
  });
});
