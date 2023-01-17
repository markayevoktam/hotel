import { TestBed } from '@angular/core/testing';

import { UserRouteAccessGuard } from './user-access.guard';

describe('UserAccessGuard', () => {
  let guard: UserRouteAccessGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UserRouteAccessGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
