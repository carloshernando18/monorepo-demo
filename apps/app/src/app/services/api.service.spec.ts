import { HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  let testingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HttpClient],
    });
    service = TestBed.inject(ApiService);
    testingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getApiMessage', async () => {
    const data = { message: 'Success' };
    service.getApiMessage().subscribe((response) => {
      console.log(response);
      console.log(expect(response).toStrictEqual('lksd'));
      expect(response).toBeFalsy();
    });
    const request = testingController.expectOne('http://localhost:3333/api');
    // expect(request.request.method).toBe('GET');

    request.flush(data);
    testingController.verify();
  });
});
