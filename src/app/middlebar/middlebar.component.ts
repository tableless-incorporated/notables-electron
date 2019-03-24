import { Component, OnInit, Inject, AfterContentInit} from '@angular/core';
import { Note } from '../firebase.service';
import { combineLatest, BehaviorSubject, Observable } from 'rxjs';
import { map, debounceTime, shareReplay, tap } from 'rxjs/operators';
import { intersection , pluck, partition, propOr, compose, map as rmap} from 'ramda';
import FuzzySearch from 'fuzzy-search';
import { DataService } from '../firefake.service';
import { SearchTermsService, KeywordTerm } from '../search-terms.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-middlebar',
  templateUrl: './middlebar.component.html',
  styleUrls: ['./middlebar.component.scss']
})
export class MiddlebarComponent implements OnInit, AfterContentInit {
  env = environment;
  notes$: Observable<Note[]>;

  searchInput$ = new BehaviorSubject<string>('');

  dataPresent$: Observable<boolean>;

  constructor(
    @Inject('DataService') public firebaseService: DataService,
    public searchTermsService: SearchTermsService,
  ) {
    this.dataPresent$ = this.firebaseService.getNotes$([]).pipe(
      map(data => data.length > 0),
    );
  }

  ngOnInit() {
    console.log('OnInit');
    const filterNotes = (notes, searchTerms) => {

       const [have, dontHave] = compose(
        rmap(pluck('name')),
        partition(propOr(true, 'selected'))
       )(searchTerms);

       return notes.filter(note => {
        return (intersection(have, note.tags).length === have.length) && (intersection(dontHave, note.tags).length === 0);
      });
    };


    this.notes$ = combineLatest(
      this.firebaseService.getNotes$([]),
      this.searchTermsService.list$,
      this.searchInput$.pipe(debounceTime(250)),
    ).pipe(
      map(([notes, searchTerms, searchInput]: [Note[], KeywordTerm[], string]) => {
        console.dir(notes);
        console.dir(searchTerms);
        console.dir(searchInput);
        const nbKeys = searchTerms.length;

        const preSelection = (!nbKeys) ? notes : filterNotes(notes, searchTerms);
        const searchStr = searchInput.trim();

        const fuzzy = () => {
          const searcher = new FuzzySearch(preSelection, ['body', 'tags'], {
            caseSensitive: false,
            sort: true,
          });

          return searcher.search(searchStr);
        };
        console.log(searchStr.length);
        console.dir( searchStr.length ? fuzzy() : preSelection);
        return searchStr.length ? fuzzy() : preSelection;
      }),
      shareReplay(1),
    );

    this.notes$.subscribe(x => console.dir(x));
  }

  ngAfterContentInit() {

  }
}

