import { TestBed } from '@angular/core/testing';

import { LoyihaService } from './loyiha.service';

describe('LoyihaService', () => {
  let service: LoyihaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoyihaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
