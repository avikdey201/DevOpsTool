import { Component, OnInit, Inject } from '@angular/core';
import { DialogData } from '../../../data-model/dailogData.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dcode-dialog',
  templateUrl: './dcode-dialog.component.html',
  styleUrls: ['./dcode-dialog.component.css']
})
export class DcodeDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DcodeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  ngOnInit() {
  }

  onClickOfClose(): void {
    this.dialogRef.close();
  }
}
