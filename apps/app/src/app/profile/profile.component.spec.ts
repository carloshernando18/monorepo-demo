import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { Profile } from '@monorepo-demo/data-models';
import { environment } from '../../environments/environment';
import { StoreService } from '../services/store.service';
import { ProfileComponent } from './profile.component';
import { AppUiModule } from '@monorepo-demo/app/ui';
import { AppMaterialModule } from '@monorepo-demo/app/material';

let storeService: StoreService;

const mockStoreService = () => ({
  save: jest.fn(),
});

const profile: Profile = {
  identification: '',
  name: '',
  phone: 0,
  address: '',
  about: '',
  id: '',
};

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppUiModule,
        AppMaterialModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFirestoreModule,
        BrowserAnimationsModule,
      ],
      declarations: [ProfileComponent],
      providers: [
        {
          provide: StoreService,
          useFactory: mockStoreService,
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
    storeService = TestBed.inject(StoreService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call save in storeService', () => {
    jest.spyOn(storeService, 'save').mockResolvedValue();
    const fixture = TestBed.createComponent(ProfileComponent);
    const app = fixture.componentInstance;
    profile.name = 'Carlos';
    app.save(profile);
    expect(storeService.save).toHaveBeenCalled();
    expect(storeService.save).toHaveBeenCalledWith(profile);
    expect(storeService.save).toHaveBeenCalledTimes(1);
  });

  it('should log the error in the console', () => {
    jest.spyOn(storeService, 'save').mockRejectedValue('Error');
    const fixture = TestBed.createComponent(ProfileComponent);
    const app = fixture.componentInstance;

    app.save(profile);
    expect(storeService.save).toHaveBeenCalled();
    expect(storeService.save).toHaveBeenCalledWith(profile);
    expect(storeService.save).toHaveBeenCalledTimes(1);
  });
});
