import { TestBed } from '@angular/core/testing';

import { MyFilterService } from './my-filter.service';

describe('MyFilterService', () => {
  let service: MyFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
