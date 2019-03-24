import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-note-search-input',
  templateUrl: './note-search-input.component.html',
  styleUrls: ['./note-search-input.component.scss']
})
export class NoteSearchInputComponent implements OnInit {
  @Output() search = new EventEmitter<string>();

  set value(v) {
    this.search.emit(v);
  }

  constructor() { }

  ngOnInit() {
  }

}
