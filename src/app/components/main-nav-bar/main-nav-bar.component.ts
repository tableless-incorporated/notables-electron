import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NoteSelectedService } from 'src/app/note-selected.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-main-nav-bar',
  templateUrl: './main-nav-bar.component.html',
  styleUrls: ['./main-nav-bar.component.scss']
})
export class MainNavBarComponent implements OnInit {
  @Output() create = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();

  isNoteSelected$: Observable<boolean>;

  constructor(public noteSelectedService: NoteSelectedService) { }

  ngOnInit() {
  }

  onCreate() {
    this.create.emit();
  }

  changeEditMode($event: boolean) {
    this.noteSelectedService.setEditMode($event);
  }

  onDelete($event) {
    this.delete.emit($event);
  }

}
