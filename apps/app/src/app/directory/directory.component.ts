import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ProfileEditComponent } from '@monorepo-demo/app/ui';
import { Profile } from '@monorepo-demo/data-models';
import { Subscription } from 'rxjs';
import { StoreService } from './../services/store.service';

@Component({
  selector: 'app-directory',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.scss'],
})
export class DirectoryComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = [
    'identification',
    'name',
    'phone',
    'address',
    'edit',
  ];
  datasource: MatTableDataSource<unknown> = new MatTableDataSource();
  tableSubscription: Subscription = new Subscription();
  dialogSubscription: Subscription = new Subscription();

  constructor(
    private storeService: StoreService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.tableSubscription = this.storeService.get().subscribe((data) => {
      this.datasource = new MatTableDataSource(data);
    });
  }

  ngOnDestroy(): void {
    this.tableSubscription.unsubscribe();
    this.dialogSubscription.unsubscribe();
  }

  edit(element: Profile) {
    const dialogRef = this.dialog.open(ProfileEditComponent, {
      data: element,
    });

    this.dialogSubscription = dialogRef
      .afterClosed()
      .subscribe((profile: Profile) => {
        this.storeService.update(profile);
        this.snackbar.open('record updated successfuly', undefined, {
          duration: 3000,
        });
      });
  }
}
