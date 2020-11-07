import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from '@monorepo-demo/app/material';
import { Profile } from '@monorepo-demo/data-models';
import { ProfileComponent } from './../profile/profile.component';
import { ProfileEditComponent } from './profile-edit.component';

const mockProfile: Profile = {
  about: '',
  address: '',
  id: '',
  identification: '',
  name: '',
  phone: 0,
};

const mockupDialogRef = () => ({
  close: jest.fn(),
});

describe('ProfileEditComponent', () => {
  let component: ProfileEditComponent;
  let fixture: ComponentFixture<ProfileEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppMaterialModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
      ],
      declarations: [ProfileEditComponent, ProfileComponent],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: mockProfile,
        },
        {
          provide: MatDialogRef,
          useFactory: mockupDialogRef,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shoud closed the dialog', () => {
    const dialogRefSpy = jest.spyOn(component.dialogRef, 'close');

    const mockProfile: Profile = {
      about: 'Excelente',
      address: 'Calle 13 # 5 - 42',
      id: 'sf454g1f6g1d1',
      identification: '236531145',
      name: 'Carlos',
      phone: 3126352415,
    };
    component.edit(mockProfile);
    expect(dialogRefSpy).toHaveBeenCalled();
    expect(dialogRefSpy).toHaveBeenCalledWith(mockProfile);
  });
});
