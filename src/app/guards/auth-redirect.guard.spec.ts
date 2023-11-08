import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

// @ts-ignore
import { authRedirectGuard } from './auth-redirect.guard';

describe('authRedirectGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
      TestBed.runInInjectionContext(() => authRedirectGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
