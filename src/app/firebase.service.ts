import { Injectable } from '@angular/core';
import { AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(public db: AngularFirestore) { }

  getNotes(){
    return this.db.collection('notes').snapshotChanges();
  }

  createNote(note) {
    this.db.collection('notes').add({ note })
  }

  deleteNote(note) {
    this.db.collection('notes').doc(note.id).delete();
  }
}
