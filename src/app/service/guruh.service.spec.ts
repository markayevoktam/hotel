import { TestBed } from '@angular/core/testing';

import { GuruhService } from './guruh.service';

describe('GuruhService', () => {
  let service: GuruhService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GuruhService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
