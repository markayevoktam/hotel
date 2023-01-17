import { TestBed } from '@angular/core/testing';

import { YunalishService } from './yunalish.service';

describe('YunalishService', () => {
  let service: YunalishService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(YunalishService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
