import { TestBed } from '@angular/core/testing';

import { FaylService } from './fayl.service';

describe('FaylService', () => {
  let service: FaylService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FaylService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
