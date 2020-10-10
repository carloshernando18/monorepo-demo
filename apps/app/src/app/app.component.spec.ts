import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AppComponent } from './app.component';
import { ApiService } from './services/api.service';

let apiService: ApiService;

const mockApiService = () => ({
  getApiMessage: jest.fn(),
});

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent],
      providers: [
        {
          provide: ApiService,
          useFactory: mockApiService,
        },
      ],
    }).compileComponents();
    apiService = TestBed.inject(ApiService);
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should shown a message.', () => {
    jest.spyOn(apiService, 'getApiMessage').mockReturnValue(of('Success'));
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const template = fixture.nativeElement;
    expect(template.querySelector('h1').textContent).toContain('Success');
  });
});
