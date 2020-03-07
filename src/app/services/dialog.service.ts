import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DcodeDialogComponent } from '../reusable-component/dcode-dialog/dcode-dialog.component';
import { DialogData } from '../../data-model/dailogData.model';

@Injectable()
export class DialogService {
  constructor(public dialog: MatDialog) {}

  public openDialog(dialogData: DialogData): void {
    const dialogRef = this.dialog.open(DcodeDialogComponent, {
      width: '600px',
      maxWidth: '600px',
      height: '350px',
      maxHeight: '350px',
      data: dialogData,
      hasBackdrop: true,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });

  }

}
