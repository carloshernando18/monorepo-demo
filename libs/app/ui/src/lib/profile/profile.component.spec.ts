import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from '@monorepo-demo/app/material';
import { Profile } from '@monorepo-demo/data-models';
import { ProfileComponent } from './profile.component';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        AppMaterialModule,
      ],
      declarations: [ProfileComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shoud emit a new profile', () => {
    const spyEmitter = jest.spyOn(component.submitProfile, 'emit');

    const mockProfile: Profile = {
      about: '',
      address: '',
      id: '',
      identification: '',
      name: 'Carlos',
      phone: null,
    };
    component.profileForm.patchValue({
      name: 'Carlos',
    });
    component.save();
    expect(spyEmitter).toHaveBeenCalled();
    expect(spyEmitter).toHaveBeenCalledWith(mockProfile);
  });

  it('shoud emit a cancel', () => {
    const spyEmitter = jest.spyOn(component.onCancel, 'emit');
    component.cancel();
    expect(spyEmitter).toHaveBeenCalled();
  });

  it('shoud hide the cancel button on create mode', () => {
    const button: DebugElement[] = fixture.debugElement.queryAll(
      (b) => b.name === 'button'
    );
    expect(button).toHaveLength(1);
  });

  it('shoud show the cancel button on edit mode', () => {
    component.mode = 'edit';
    fixture.detectChanges();
    const button: DebugElement[] = fixture.debugElement.queryAll(
      (b) => b.name === 'button'
    );
    expect(button).toHaveLength(2);
  });
});
