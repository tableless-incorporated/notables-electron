import { Component, Input, SimpleChanges, OnChanges } from '@angular/core';
import { Note, FirebaseService } from '../firebase.service';
import { Observable, of, Subject, BehaviorSubject, from } from 'rxjs';
import { pathOr } from 'ramda';

@Component({
  selector: 'app-mainbar',
  templateUrl: './mainbar.component.html',
  styleUrls: ['./mainbar.component.scss']
})
export class MainbarComponent implements OnChanges {
  @Input() selectedNote: any;

  isEdit = false;
  isNote = false;
  note: Note = new Note();

  noteTags: string[] = [];

  public requestAutocompleteItems = (text: string): Observable<string[]> => {
    return of(this.note.tags);
  }

  onTextChange($event: string) {
    console.dir($event);
  }

  constructor(public firebaseService: FirebaseService) { }

  currentNoteChanged(newNote: Note) {
    if (newNote) {
      this.note = newNote;
      this.noteTags = newNote.tags;
      this.isNote = true;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    this.currentNoteChanged(changes.selectedNote.currentValue);
  }

  async onCreate() {
    this.currentNoteChanged(
      await (
        await this.firebaseService.createNote(new Note())
      ).get().then(Note.fromRawData)
    );
    this.isEdit = true;
  }

  onSave() {
    if (!this.note.id) { return; }
    this.note.tags = this.noteTags.map(tag => pathOr(tag, ['value'], tag));
    this.firebaseService.updateNote(this.note);
  }

  onDelete() {
    if (!this.note.id) { return; }
    this.firebaseService.deleteNote(this.note);
    this.isNote = false;
  }
}
