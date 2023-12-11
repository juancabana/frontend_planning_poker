import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { HttpService } from './http-service.service';

describe('HttpServiceService', () => {
  let service: HttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // proporciona HttpClient
      providers: [HttpService]
    });
    service = TestBed.inject(HttpService);
  });

  test('should be created', () => {
    expect(service).toBeTruthy();
  });
});
