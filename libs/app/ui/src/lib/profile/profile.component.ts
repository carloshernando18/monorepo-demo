import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
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
  @Output() submit = new EventEmitter<Profile>();

  profileForm = this.formBuilder.group({
    identification: ['', [Validators.required, Validators.minLength(5)]],
    name: ['', [Validators.required]],
    phone: [
      '',
      [Validators.required, Validators.minLength(10), Validators.maxLength(10)],
    ],
    address: ['', [Validators.required]],
    about: ['', [Validators.required, Validators.minLength(5)]],
  });

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    // ..
  }

  save() {
    this.submit.emit(this.profileForm.value);
  }
}
