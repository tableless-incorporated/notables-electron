import { Injectable } from '@angular/core';
import { Map } from 'storyx';
import { map, tap } from 'rxjs/operators';
import { values } from 'ramda';
import { Observable } from 'rxjs';

export interface KeywordTerm { selected: boolean; name: string; id?: string; }

@Injectable({
  providedIn: 'root'
})
export class SearchTermsService extends Map {

  constructor() {
    // super([], 'id');
    super({});
  }

  get list$(): Observable<KeywordTerm[]> {
    return this.obs$.pipe(
      map((obj: {}) => values(obj)),
    );
  }

  unselect = this.delete;

  show(name) {
    this.set(name, {selected: true, name, id: name});
  }

  hide(name) {
    this.set(name, {selected: false, name, id: name});
  }

  clear() {
    this.update((_: any) => {});
  }
}
