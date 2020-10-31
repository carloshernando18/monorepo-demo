import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from '@monorepo-demo/app/material';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  imports: [CommonModule, AppMaterialModule, ReactiveFormsModule],
  declarations: [ProfileComponent, ProfileEditComponent],
  exports: [ProfileComponent, ProfileEditComponent],
})
export class AppUiModule {}
