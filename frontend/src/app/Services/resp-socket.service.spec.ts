import { TestBed } from '@angular/core/testing';

import { RespSocketService } from './resp-socket.service';

describe('RespSocketService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RespSocketService = TestBed.get(RespSocketService);
    expect(service).toBeTruthy();
  });
});
