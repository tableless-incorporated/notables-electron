import { Component, EventEmitter, Inject, Input, OnInit, Output, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { DataService } from 'src/app/firefake.service';
import { SearchTermsService } from 'src/app/search-terms.service';
import { ObjList } from 'storyx';
import { KeywordTerm } from '../ui/search-input/search-input.component';

@Component({
  selector: 'app-middle-nav-bar',
  templateUrl: './middle-nav-bar.component.html',
  styleUrls: ['./middle-nav-bar.component.scss']
})
export class MiddleNavBarComponent implements OnInit, OnDestroy {
  onDestroy$ = new Subject();
  @Output() search = new EventEmitter<string>();
  searchTerms = new ObjList<KeywordTerm>([], 'id');

  @Input() searchInput$: Subject<string>;

  remove$ = new Subject<string>();
  add$ = new Subject<KeywordTerm>();
  reset$ = new Subject<void>();
  visibility$ =  new Subject<{name: string, selected: boolean}>();

  suggestions;

  constructor(
    public searchTermsService: SearchTermsService,
    @Inject('DataService') public firebaseService: DataService,
    ) {

     this.firebaseService.tags$.pipe(
      takeUntil(this.onDestroy$)
    ).subscribe(suggestions => {
      console.dir('new suggestions');
      this.suggestions = suggestions;
    });

     this.searchTermsService.list$.pipe(
      map(list => previous => {
        return list; // unionWith(eqBy(prop('name')), previous, list);
      })
    ).subscribe(this.searchTerms.updater$s);

     this.remove$.subscribe(id => {
      this.searchTermsService.unselect(id);
    });

     this.add$.subscribe(({name}) => {
      this.searchTermsService.show(name);
    });

     this.visibility$.subscribe(({name, selected}) => {
      if (selected) {
        this.searchTermsService.show(name);
      } else {
        this.searchTermsService.hide(name);
      }
    });

     this.reset$.subscribe(() => {
      this.searchTermsService.clear();
      this.searchInput$.next('');
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.unsubscribe();
  }

  onSearchChange($event) {
    this.search.emit($event);
  }
}
