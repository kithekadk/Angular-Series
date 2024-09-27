import { TestBed } from '@angular/core/testing';

import { ProductNgrxService } from './product-ngrx.service';

describe('ProductNgrxService', () => {
  let service: ProductNgrxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductNgrxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
