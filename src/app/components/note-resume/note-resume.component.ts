import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Note } from 'src/app/firebase.service';

@Component({
  selector: 'app-note-resume',
  templateUrl: './note-resume.component.html',
  styleUrls: ['./note-resume.component.scss']
})
export class NoteResumeComponent implements OnInit {
  @Input() note: Note;
  @Output() click = new EventEmitter<void>() ;

  constructor() { }

  ngOnInit() {
  }

  onSelect() {
    this.click.emit();
  }

}
