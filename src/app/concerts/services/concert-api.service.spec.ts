import { TestBed } from '@angular/core/testing';

import { ConcertApiService } from './concert-api.service';

describe('ConcertApiService', () => {
  let service: ConcertApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConcertApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
