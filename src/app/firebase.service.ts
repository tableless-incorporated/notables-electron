import { Injectable } from '@angular/core';
import { AngularFirestore, QueryDocumentSnapshot} from '@angular/fire/firestore';

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
}

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(public db: AngularFirestore) { }

  getNotes$(tags: Tag[] = []) {
    return this.db.collection('notes').snapshotChanges();
  }

  createNote(note) {
    this.db.collection('notes').add({ note });
  }

  deleteNote(note) {
    this.db.collection('notes').doc(note.id).delete();
  }
}
