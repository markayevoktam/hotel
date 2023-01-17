import { TestBed } from '@angular/core/testing';

import { YutuqService } from './yutuq.service';

describe('YutuqService', () => {
  let service: YutuqService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(YutuqService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
