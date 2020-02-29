import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-board',
  templateUrl: './dialog-board.component.html',
  styleUrls: ['./dialog-board.component.css']
})
export class DialogBoardComponent implements OnInit {
  boardDetails: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DialogBoardComponent>,
  ) {
    this.boardDetails = data;
   }

  ngOnInit() {
    console.log(this.boardDetails);
  }

  onOkClick(): void {
    this.dialogRef.close();
  }

}
