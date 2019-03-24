import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, DocumentChangeAction, QueryDocumentSnapshot } from '@angular/fire/firestore';
import { auth, firestore } from 'firebase';
import * as firebaseui from 'firebaseui';
import { compose, filter, uniq, flatten, pluck, length, split } from 'ramda';
import { Observable, of } from 'rxjs';
import { map, share, tap, take } from 'rxjs/operators';

type TagPath = string[];

export interface NoteRaw {
  body;
  tags?: string[];
}

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
      return line || '';
    };

    const truncate = compose(
      words => {
        const maxTitleChar = 25;
        const addWordsToTitle = ([word, ...rest]: string[], str: string= '', count: number= 0) => {
          if (!word) { return str; }
          const len = word.length + 1;
          if (count === maxTitleChar) { return str; }
          if ((count + len) >= maxTitleChar) {
            return str + ' ' + word.slice(0, maxTitleChar - count - 1) + '…';
          } else {
            return addWordsToTitle(rest, str + ' ' + word, count + len, );
          }
        };
        return addWordsToTitle(words);
      },
      filter(length),
      split(' ')
    );

    return  (this.body && truncate(getFirstLine(this.body))) || 'Untitled';
  }

  static fromRawData(data: QueryDocumentSnapshot<{}> ) {
    return new Note({id: data.id, body: '', tags: [], ...data.data()});
  }

  get raw(): NoteRaw {
    return { body: this.body, tags: this.tags };
  }
}

@Injectable()
export class FirebaseService {


  constructor(
    public db: AngularFirestore,
    public afAuth: AngularFireAuth, ) {
    this.db.firestore.enablePersistence();

    this.ui = new firebaseui.auth.AuthUI(this.afAuth.auth);
    if (this.ui.isPendingRedirect()) {
      this.pendingRequest = true;
      this.login();
    }
  }

  get user$() {
    return this.afAuth.user;
  }
  ui: firebaseui.auth.AuthUI;
  pendingRequest = false;


  buildReq = (tags: TagPath[]) => (ref: firestore.CollectionReference): firestore.Query => tags.reduce(
    (acc: firestore.CollectionReference, path: TagPath) => {
      const p = new firestore.FieldPath('tags', ...path);

      return acc.where(p , '==', 'true');
    }, ref
  )

  getNotes$(tags: TagPath[] = []): Observable<Note[]> {
    return this.db.collection('notes', this.buildReq(tags)).snapshotChanges().pipe(
      map(
        (data: DocumentChangeAction<{}>[]) => data.map(val => Note.fromRawData(val.payload.doc))
      ),
      // map(_ => [/*new Note({id: 'test', body: 'test', tags: []})*/]),
      share()
    );
  }

  get tags$(): Observable<string[]> {
    return this.getNotes$([]).pipe(
      map( (listNote: Note[]): string[] => {
        return compose(
          uniq,
          flatten,
          pluck('tags'),
        )(listNote);
      }),
      share(),
    );
  }

  createNote(note) {
    this.db.collection('notes').add(note.raw).then(doc => doc.get()).then(Note.fromRawData);
  }

  deleteNote(note)   {
    return this.db.collection('notes').doc(note.id).delete();
  }

  updateNote(note) {
    return this.db.collection('notes').doc(note.id).update(note.raw);
  }

  login() {
    const uiConfig = {
      signInFlow: 'popup',
      signInOptions: [
        {
          provider: auth.GoogleAuthProvider.PROVIDER_ID,
          requireDisplayName: false
        },
        {
          provider: auth.EmailAuthProvider.PROVIDER_ID,

        }
      ],
      callbacks: {
        signInSuccessWithAuthResult(authResult, redirectUrl) {
          // User successfully signed in.
          // Return type determines whether we continue the redirect automatically
          // or whether we leave that to developer to handle.
          return false;
        },
      }
    };
    this.ui.start('#firebaseui-auth-container', uiConfig);
    /*
        this.afAuth.auth.signInWithEmailAndPassword('nicolas@thomasson.fr', "123456");*/
  }
}
