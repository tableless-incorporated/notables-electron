import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-middlebar',
  templateUrl: './middlebar.component.html',
  styleUrls: ['./middlebar.component.scss']
})
export class MiddlebarComponent implements OnInit {

  @Output() selectedNote = new EventEmitter() ;
  items: Array<any>;

  constructor(
    public firebaseService: FirebaseService
  ) { }

  ngOnInit() {
    this.firebaseService.getNotes$()
    .subscribe(result => {
      this.items = result;
    });
  }

  getTitle(item) {
    const body = item.payload.doc.data().body;

    const getFirstLine = (text) => {
      const line = body.split('\n').find(l => l.trim().length);
      return line;
    };

    return  (body && getFirstLine(body)) || 'Untitled';
  }

  onSelect(item: any) {
    this.selectedNote.emit(item.payload.doc);
  }

}
