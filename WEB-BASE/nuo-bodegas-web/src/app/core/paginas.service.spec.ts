import { TestBed } from '@angular/core/testing';

import { PaginasService } from './paginas.service';

describe('PaginasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PaginasService = TestBed.get(PaginasService);
    expect(service).toBeTruthy();
  });
});
