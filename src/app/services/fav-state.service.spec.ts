import { TestBed } from '@angular/core/testing';

import { FavStateService } from './fav-state.service';

describe('FavStateService', () => {
  let service: FavStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
