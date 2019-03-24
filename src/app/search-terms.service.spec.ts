import { TestBed } from '@angular/core/testing';

import { SearchTermsService } from './search-terms.service';

describe('SearchTermsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SearchTermsService = TestBed.get(SearchTermsService);
    expect(service).toBeTruthy();
  });
});
