import { TestBed } from '@angular/core/testing';

import { XarakterService } from './xarakter.service';

describe('XarakterService', () => {
  let service: XarakterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(XarakterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
