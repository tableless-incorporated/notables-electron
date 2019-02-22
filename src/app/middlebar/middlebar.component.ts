import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { FirebaseService, Note } from '../firebase.service';

@Component({
  selector: 'app-middlebar',
  templateUrl: './middlebar.component.html',
  styleUrls: ['./middlebar.component.scss']
})
export class MiddlebarComponent implements OnInit {

  @Output() selectedNote = new EventEmitter() ;
  items: Note[];

  constructor(
    public firebaseService: FirebaseService
  ) { }

  ngOnInit() {
    this.firebaseService.getNotes$()
    .subscribe(result => {
      this.items = result;
    });
  }

  onSelect(item: Note) {
    this.selectedNote.emit(item);
  }

}
