import { TestBed } from '@angular/core/testing';

import { TalabaService } from './talaba.service';

describe('TalabaService', () => {
  let service: TalabaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TalabaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
