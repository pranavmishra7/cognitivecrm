import { TestBed } from '@angular/core/testing';

import { TemplateImportServiceService } from './template-import-service.service';

describe('TemplateImportServiceService', () => {
  let service: TemplateImportServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TemplateImportServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
