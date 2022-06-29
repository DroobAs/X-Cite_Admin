import { TestBed } from '@angular/core/testing';

import { WebConfigService } from './web-config.service';

describe('WebConfigService', () => {
  let service: WebConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
