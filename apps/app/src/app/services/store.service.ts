import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Profile } from '@monorepo-demo/data-models';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  constructor(private firestore: AngularFirestore) {}

  save(profile: Profile): Promise<void> {
    if (profile.name) {
      const id = this.firestore.createId();
      profile.id = id;
      return this.firestore.collection('profiles').doc(id).set(profile);
    }
    return new Promise<void>((resolve, reject) => reject('Name required'));
  }

  update(profile: Profile) {
    this.firestore.doc(`profiles/${profile.id}`).update(profile);
  }

  get() {
    return this.firestore.collection('profiles').valueChanges();
  }

  delete(id: string) {
    this.firestore.doc(`profiles/${id}`).delete();
  }
}
