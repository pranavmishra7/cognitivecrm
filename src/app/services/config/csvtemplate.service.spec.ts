import { TestBed } from '@angular/core/testing';

import { CsvtemplateService } from './csvtemplate.service';

describe('CsvtemplateService', () => {
  let service: CsvtemplateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CsvtemplateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
