import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getApiMessage(): Observable<string> {
    return this.http
      .get<{ message: string }>('http://localhost:3333/api')
      .pipe(map((x) => x.message));
  }
}
