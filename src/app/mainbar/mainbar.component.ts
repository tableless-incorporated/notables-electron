import { Component, Input, SimpleChanges, OnChanges } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-mainbar',
  templateUrl: './mainbar.component.html',
  styleUrls: ['./mainbar.component.scss']
})
export class MainbarComponent implements OnChanges {
  @Input() selectedNote: any;

  isEdit = false;
  noteRef = null;
  note = {
    body: ''
  };

  constructor(public db: AngularFirestore) { }

  refUpdate(newRef) {
    if (newRef) {
      this.noteRef = newRef;
      this.note = this.noteRef.data();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    this.refUpdate(changes.selectedNote.currentValue);
  }

  async onCreate() {
    this.refUpdate(
      await (
        await this.db.collection('notes').add({})
      ).get()
    );
    this.isEdit = true;
  }

  onSave() {
    const note = this.db.doc<{body: string}>(`notes/${this.noteRef.id}`);
    note.update({ body: this.note.body });
  }
}
