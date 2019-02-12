import { TestBed } from '@angular/core/testing';

import { TrailsApiService } from './trails-api.service';

describe('TrailsApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TrailsApiService = TestBed.get(TrailsApiService);
    expect(service).toBeTruthy();
  });
});
