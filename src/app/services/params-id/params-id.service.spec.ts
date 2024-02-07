import { TestBed } from '@angular/core/testing';

import { ParamsIdService } from './params-id.service';

describe('ParamsIdService', () => {
  let service: ParamsIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParamsIdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
