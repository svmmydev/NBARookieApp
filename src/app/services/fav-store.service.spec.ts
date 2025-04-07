import { TestBed } from '@angular/core/testing';

import { FavStoreService } from './fav-store.service';

describe('FavStoreService', () => {
  let service: FavStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
