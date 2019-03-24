import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-note-create-button',
  templateUrl: './note-create-button.component.html',
  styleUrls: ['./note-create-button.component.scss']
})
export class NoteCreateButtonComponent implements OnInit {
  @Input() size = 16;
  constructor() { }

  ngOnInit() {
  }

}
