import { Component, OnInit, Input, ContentChild, TemplateRef } from '@angular/core';
import { Note } from 'src/app/firebase.service';

@Component({
  selector: 'app-list-notes',
  templateUrl: './list-notes.component.html',
  styleUrls: ['./list-notes.component.scss']
})
export class ListNotesComponent implements OnInit {

  @Input() notes: Note[] = [];

  @ContentChild(TemplateRef) templateVariable: TemplateRef<any>;

  constructor() { }

  ngOnInit() {
  }

}
