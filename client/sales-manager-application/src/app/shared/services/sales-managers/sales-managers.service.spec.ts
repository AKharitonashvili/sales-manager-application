import { TestBed } from '@angular/core/testing';

import { SalesManagersService } from './sales-managers.service';

describe('SalesManagersService', () => {
  let service: SalesManagersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalesManagersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
