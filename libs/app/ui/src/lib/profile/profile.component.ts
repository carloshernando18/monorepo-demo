import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Profile } from '@monorepo-demo/data-models';

@Component({
  selector: 'monorepo-demo-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent implements OnInit {
  @Output() submitProfile = new EventEmitter<Profile>();
  @Output() onCancel = new EventEmitter<void>();
  @Input() profile: Profile;
  @Input() mode: 'create' | 'edit' = 'create';

  profileForm = this.formBuilder.group({
    identification: ['', [Validators.required, Validators.minLength(5)]],
    name: ['', [Validators.required]],
    phone: [
      null,
      [Validators.required, Validators.minLength(10), Validators.maxLength(10)],
    ],
    address: ['', [Validators.required]],
    about: ['', [Validators.required, Validators.minLength(5)]],
    id: [''],
  });

  constructor(private formBuilder: FormBuilder) {
    this.profile = this.profileForm.value;
  }

  ngOnInit(): void {
    this.profileForm.patchValue(this.profile);
  }

  save() {
    this.submitProfile.emit(this.profileForm.value);
    this.profileForm.reset();
  }

  cancel() {
    this.onCancel.emit();
  }
}
