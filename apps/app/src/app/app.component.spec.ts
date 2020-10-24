import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { RouterTestingModule } from '@angular/router/testing';
import { Profile } from '@monorepo-demo/data-models';
import { of } from 'rxjs';
import { environment } from './../environments/environment';
import { AppComponent } from './app.component';
import { ApiService } from './services/api.service';
import { StoreService } from './services/store.service';

let apiService: ApiService;
let storeService: StoreService;

const mockApiService = () => ({
  getApiMessage: jest.fn(),
});

const mockStoreService = () => ({
  save: jest.fn(),
});

const profile: Profile = {
  identification: '',
  name: '',
  phone: 0,
  address: '',
  about: '',
};

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireModule,
      ],
      declarations: [AppComponent],
      providers: [
        {
          provide: ApiService,
          useFactory: mockApiService,
        },
        {
          provide: StoreService,
          useFactory: mockStoreService,
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
    apiService = TestBed.inject(ApiService);
    storeService = TestBed.inject(StoreService);
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

  it('should call save in storeService', () => {
    jest.spyOn(storeService, 'save').mockResolvedValue();
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    profile.name = 'Carlos';
    app.save(profile);
    expect(storeService.save).toHaveBeenCalled();
    expect(storeService.save).toHaveBeenCalledWith(profile);
    expect(storeService.save).toHaveBeenCalledTimes(1);
  });

  it('should log the error in the console', () => {
    jest.spyOn(storeService, 'save').mockRejectedValue('Error');
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    app.save(profile);
    expect(storeService.save).toHaveBeenCalled();
    expect(storeService.save).toHaveBeenCalledWith(profile);
    expect(storeService.save).toHaveBeenCalledTimes(1);
  });
});
