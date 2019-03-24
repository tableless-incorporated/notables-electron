import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-note-delete-button',
  templateUrl: './note-delete-button.component.html',
  styleUrls: ['./note-delete-button.component.scss']
})
export class NoteDeleteButtonComponent implements OnInit {
  @Output() delete = new EventEmitter<void>();
  @Input() size = 16;

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  onDelete() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        width: '250px',
        data: {}
      });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed with ' + result);
      if (result) {
        this.delete.emit();
      }
    });

  }

}
