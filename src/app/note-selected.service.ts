import { Injectable } from '@angular/core';
import { State } from 'storyx';
import { Note } from './firebase.service';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import {prop} from 'ramda';

@Injectable({
  providedIn: 'root'
})
export class NoteSelectedService extends State<{
  content: Note,
  editMode: boolean,
}> {

  isNoteSelected$: Observable<boolean>;
  note$: Observable<Note>;
  edit$: Observable<boolean>;

  constructor() {
    super({content: null, editMode: false});

    this.isNoteSelected$ = this.obs$.pipe(
      map(({content}) => !!content)
    );

    this.note$ = this.obs$.pipe(
      // filter(note => !!note),
      map(prop('content'))
    );

    this.edit$ = this.obs$.pipe(
      // filter(note => !!note),
      map(prop('editMode'))
    );
  }

  select(content: Note|null) {
    this.update(({content, editMode: false}));
  }

  setEditMode(editMode: boolean) {
    this.update(({content}) => ( {content, editMode}));
  }

}
