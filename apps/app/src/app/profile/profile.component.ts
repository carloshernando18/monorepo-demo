import { MatSnackBar } from '@angular/material/snack-bar';
import { Component } from '@angular/core';
import { Profile } from '@monorepo-demo/data-models';
import { StoreService } from '../services/store.service';

@Component({
  selector: 'artic-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  constructor(
    private storeService: StoreService,
    private snackBar: MatSnackBar
  ) {}

  save(profile: Profile) {
    this.storeService
      .save(profile)
      .then(() =>
        this.snackBar.open('record saved successfuly', undefined, {
          duration: 3000,
        })
      )
      .catch((error) => console.error(error));
  }
}
