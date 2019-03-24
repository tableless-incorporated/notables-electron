import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { compose, map as rmap, pathOr, pluck, propOr } from 'ramda';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, take, takeUntil } from 'rxjs/operators';
import { ObjList } from 'storyx';
import { environment } from '../../environments/environment';
import { KeywordTerm } from '../components/ui/search-input/search-input.component';
import { Note } from '../firebase.service';
import { DataService } from '../firefake.service';
import { NoteSelectedService } from '../note-selected.service';

@Component({
  selector: 'app-mainbar',
  templateUrl: './mainbar.component.html',
  styleUrls: ['./mainbar.component.scss']
})
export class MainbarComponent implements OnInit , OnDestroy {

  constructor(
    @Inject('DataService') public notesService: DataService,
    public noteSelectedService: NoteSelectedService
  ) {

    this.notesService.tags$.pipe(
      takeUntil(this.onDestroy$)
    ).subscribe(tags => this.tags = tags);

    this.remove$.subscribe(id => {
      this.keywordService.removeById(id);
    });

    this.add$.subscribe((kw) => {
      this.keywordService.add$(kw).subscribe();
    });

    this.reset$.subscribe(() => {
      this.keywordService.update([]);
      this.searchInput$.next('');
    });
  }
  env = environment;
  isEdit$: Observable<boolean>;
  note: Note = new Note();

  onDestroy$ = new Subject<void>();

  keywordService = new ObjList<KeywordTerm>([], 'id');

  dataPresent$: Observable<boolean>;

  searchInput$ = new BehaviorSubject<string>('');

  remove$ = new Subject<string>();
  add$ = new Subject<KeywordTerm>();
  reset$ = new Subject<void>();

  tags: string[];

  public requestAutocompleteItems = (text: string): Observable<string[]> => {
    return this.noteSelectedService.note$.pipe(pathOr([], 'tags'));
  }

  ngOnInit() {
    this.noteSelectedService.note$.pipe(
      takeUntil(this.onDestroy$),
    ).subscribe((note: Note) => {
      this.note = note;

      compose(
        tags => this.keywordService.update(tags),
        rmap(name => ({selected: true, name, id: name})),
        propOr([], 'tags')
      )(note);
    });

    this.isEdit$ = this.noteSelectedService.edit$;

    this.dataPresent$ = this.notesService.getNotes$([]).pipe(map(data => data.length > 0));
  }

  ngOnDestroy() {
    this.onDestroy$.next();
  }

   onCreate() {
    this.notesService.getNotes$([]).pipe(
      map(data => data.length),
      take(1)
    ).subscribe(
      async nb => {
        const note = new Note();

        note.body = '# Untitled note ' + (nb + 1);

        const newNote = await this.notesService.createNote(note);

        this.noteSelectedService.select(newNote);
        this.noteSelectedService.setEditMode(true);
      }
    );
  }

  onSave() {
    if (!this.note.id) { return; }
    this.keywordService.obs$.pipe(
      map(pluck('name')),
      take(1),
    ).subscribe(
      (tags: string[]) => {
        this.note.tags = tags;
        this.notesService.updateNote(this.note);
      }
    );

  }

  onDelete() {
    if (!this.note.id) { return; }
    this.notesService.deleteNote(this.note);
    this.noteSelectedService.select(null);
  }
}
