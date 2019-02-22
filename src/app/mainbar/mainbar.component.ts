import { Component, Input, SimpleChanges, OnChanges } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Note } from '../firebase.service';

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

  constructor(public db: AngularFirestore) { }

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
        await this.db.collection('notes').add({})
      ).get().then(Note.fromRawData)
    );
    this.isEdit = true;
  }

  onSave() {
    if (!this.note.id) { return; }
    const note = this.db.doc<{body: string}>(`notes/${this.note.id}`);
    note.update({ body: this.note.body });
  }

  onDelete() {
    if (!this.note.id) { return; }
    this.firebaseService.deleteNote(this.note);
    this.isNote = false;
  }
}
