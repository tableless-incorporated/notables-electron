import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Note } from 'src/app/firebase.service';
import { NoteSelectedService } from 'src/app/note-selected.service';
import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-note-resumes',
  templateUrl: './note-resumes.component.html',
  styleUrls: ['./note-resumes.component.scss']
})
export class NoteResumesComponent implements OnInit, OnDestroy {
  @Input() notes$: Observable<Note[]>;

  currentlySelected = null;

  onDestroy$ = new Subject<void>();

  constructor(public noteSelectedService: NoteSelectedService) { }

  ngOnInit() {
    this.noteSelectedService.note$.pipe(
      takeUntil(this.onDestroy$)
    ).subscribe(note => this.currentlySelected = note);
  }

  ngOnDestroy() {
    this.onDestroy$.next();
  }

  onSelect(note: Note) {
    this.noteSelectedService.select(note);
  }
}
