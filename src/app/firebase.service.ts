import { Injectable } from '@angular/core';
import { AngularFirestore, QueryDocumentSnapshot, DocumentChangeAction} from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

type TagPath = string[];

export class Note {
  id: string = null;
  body = '';
  tags?: string[] = [];

  constructor({id, body, tags} = {id: null, body: '', tags: [], }) {
    this.id = id || null;
    this.body = body || '';
    this.tags = tags || [];
  }

  get title() {
    const getFirstLine = (text) => {
      const line = this.body.split('\n').find(l => l.trim().length > 0);
      return line;
    };

    return  (this.body && getFirstLine(this.body)) || 'Untitled';
  }

  static fromRawData(data: QueryDocumentSnapshot<{}> ) {
    return new Note({id: data.id, body: '', tags: [], ...data.data()});
  }

  get raw() {
    return { body: this.body, tags: this.tags };
  }
}

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(public db: AngularFirestore) { }

  getNotes$(tags: TagPath[] = []): Observable<Note[]> {
    return this.db.collection('notes').snapshotChanges().pipe(
      map(
        (data: DocumentChangeAction<{}>[]) => data.map(val => Note.fromRawData(val.payload.doc))
      )
    );
  }

  createNote(note) {
    return this.db.collection('notes').add(note.raw);
  }

  deleteNote(note) {
    return this.db.collection('notes').doc(note.id).delete();
  }

  updateNote(note) {
    return this.db.collection('notes').doc(note.id).update(note.raw);
  }
}
