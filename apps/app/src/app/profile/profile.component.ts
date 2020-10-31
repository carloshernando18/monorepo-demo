import { Component } from '@angular/core';
import { StoreService } from '../services/store.service';
import { Profile } from '@monorepo-demo/data-models';

@Component({
  selector: 'artic-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  constructor(private storeService: StoreService) {}

  save(profile: Profile) {
    this.storeService
      .save(profile)
      .then((response) => console.log(response))
      .catch((error) => console.error(error));
  }
}
