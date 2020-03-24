import { TestBed } from '@angular/core/testing';

import { ModelosService } from './modelos.service';

describe('ModelosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ModelosService = TestBed.get(ModelosService);
    expect(service).toBeTruthy();
  });
});
