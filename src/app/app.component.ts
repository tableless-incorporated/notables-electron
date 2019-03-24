import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { NoteSelectedService } from './note-selected.service';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { DataService } from './firefake.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(@Inject('DataService') public dataService: DataService, ) {
  }

  login() {
    this.dataService.login();
  }
}
