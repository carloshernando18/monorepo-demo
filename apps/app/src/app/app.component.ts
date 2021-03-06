import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './services/api.service';

@Component({
  selector: 'artic-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  apiMessage$: Observable<string>;

  constructor(private apiService: ApiService) {
    this.apiMessage$ = this.apiService.getApiMessage();
  }
}
