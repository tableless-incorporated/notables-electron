import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-note-title-card',
  templateUrl: './note-title-card.component.html',
  styleUrls: ['./note-title-card.component.scss']
})
export class NoteTitleCardComponent implements OnInit {
  @Input() selected = false;
  @Input() text = '';

  constructor() { }

  ngOnInit() {
  }

}
