import { TestBed } from '@angular/core/testing';

import { QuesServiceService } from './ques-service.service';

describe('QuesServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QuesServiceService = TestBed.get(QuesServiceService);
    expect(service).toBeTruthy();
  });
});
