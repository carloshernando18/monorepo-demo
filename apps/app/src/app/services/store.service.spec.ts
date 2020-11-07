import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import {
  AngularFirestore,
  AngularFirestoreModule,
} from '@angular/fire/firestore';
import { Profile } from '@monorepo-demo/data-models';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { environment } from './../../environments/environment';
import { StoreService } from './store.service';

const mockAngularFirestore = () => ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  collection: (name: string) => ({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    doc: (id: string) => ({
      valueChanges: () => new BehaviorSubject({ foo: 'bar' }),
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      set: (document: unknown) => new Promise((resolve) => resolve()),
    }),
  }),
  createId: jest.fn(),
  doc: jest.fn(),
});

describe('StoreService', () => {
  let service: StoreService;
  let firestoreService: AngularFirestore;
  const profile: Profile = {
    identification: '',
    name: '',
    phone: 0,
    address: '',
    about: '',
    id: '',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFirestoreModule,
      ],
      providers: [
        {
          provide: AngularFirestore,
          useFactory: mockAngularFirestore,
        },
      ],
    });
    service = TestBed.inject(StoreService);
    firestoreService = TestBed.inject(AngularFirestore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a error message', async () => {
    try {
      await service.save(profile);
    } catch (error) {
      expect(error).toBe('Name required');
    }
  });

  it('should save a new profile', async () => {
    profile.name = 'test';
    jest.spyOn(firestoreService, 'createId').mockReturnValue('1');
    try {
      await service.save(profile);
    } catch (error) {
      expect(error).not.toBe('Name required');
    }
  });

  it('should update the profile', async () => {
    const mockAngularFirestoreDocument = {
      update: jest.fn(),
    };
    const docSpy = jest
      .spyOn(firestoreService, 'doc')
      .mockReturnValue(mockAngularFirestoreDocument as never);
    const updateSpy = jest.spyOn(mockAngularFirestoreDocument, 'update');

    profile.id = '1';
    service.update(profile);

    expect(docSpy).toHaveBeenCalled();
    expect(docSpy).toHaveBeenCalledWith('profiles/1');

    expect(updateSpy).toHaveBeenCalled();
    expect(updateSpy).toHaveBeenCalledWith(profile);
  });

  it('should delete the profile', async () => {
    const mockAngularFirestoreDocument = {
      delete: jest.fn(),
    };
    const docSpy = jest
      .spyOn(firestoreService, 'doc')
      .mockReturnValue(mockAngularFirestoreDocument as never);

    service.delete('1');

    expect(docSpy).toHaveBeenCalled();
    expect(docSpy).toHaveBeenCalledWith('profiles/1');
  });

  it('should return the stored data', () => {
    const mockAngularFirestoreCollection = {
      valueChanges: jest.fn(),
    };
    jest
      .spyOn(firestoreService, 'collection')
      .mockReturnValue(mockAngularFirestoreCollection as never);
    const valueChangesSpy = jest
      .spyOn(mockAngularFirestoreCollection, 'valueChanges')
      .mockReturnValue(of([]));
    const result = service.get();
    expect(valueChangesSpy).toHaveBeenCalled();
    expect(result).toBeInstanceOf(Observable);
  });
});
