import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-middlebar',
  templateUrl: './middlebar.component.html',
  styleUrls: ['./middlebar.component.scss']
})
export class MiddlebarComponent implements OnInit {

  items: Array<any>;

  constructor(
    public firebaseService: FirebaseService
  ) { }

  ngOnInit() {
    this.firebaseService.getNotes()
    .subscribe(result => {
      this.items = result;
    })
  }

}
