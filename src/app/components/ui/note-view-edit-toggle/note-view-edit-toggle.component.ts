import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material';

@Component({
  selector: 'app-note-view-edit-toggle',
  templateUrl: './note-view-edit-toggle.component.html',
  styleUrls: ['./note-view-edit-toggle.component.scss']
})
export class NoteViewEditToggleComponent implements OnInit {
  @Output() change = new EventEmitter<boolean>();
  @Input() checked = true;

  constructor() { }

  ngOnInit() {
  }

  onChange($event: MatSlideToggleChange) {
    this.checked = $event.checked;
    this.change.emit($event.checked);
  }

}
