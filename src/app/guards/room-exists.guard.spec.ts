import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { roomExistsGuard } from './room-exists.guard';

describe('roomExistsGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
      TestBed.runInInjectionContext(() => roomExistsGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
