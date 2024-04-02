import { TestBed } from '@angular/core/testing';

import { SwgroupService } from './swgroup.service';

describe('SwgroupService', () => {
  let service: SwgroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SwgroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
