import { COMMA, TAB } from '@angular/cdk/keycodes';
import { Component, ElementRef, ViewChild, OnDestroy, Input, AfterViewInit, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatChipSelectionChange, MatChipInputEvent } from '@angular/material';
import { Observable, Subject, fromEvent, combineLatest } from 'rxjs';
import { map, startWith , takeUntil, tap,  } from 'rxjs/operators';
import { ObjList } from 'storyx';
import { pathOr, gt, compose, trim} from 'ramda';

export interface KeywordTerm { selected: boolean; name: string; id?: string; }

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent implements OnDestroy , AfterViewInit, OnInit {
  visible = true;
  selectable = true;
  addOnBlur = false;
  separatorKeysCodes: number[] = [COMMA, TAB];
  keywordCtrl = new FormControl();
  filteredkeywords: Observable<string[]>;

  dataToClear$: Observable<boolean>;

  @Input() visibilityToggle = false;
  @Input() removeButton: true|false|'disabled' = false;
  @Input() inputVisibilty: false;
  @Input() placeholder = 'Filter…';

  @Input() keywords$: ObjList<KeywordTerm> = new ObjList<KeywordTerm>([]);
  @Input() remove$ = new Subject<string>();
  @Input() add$ = new Subject<KeywordTerm>();
  @Input() visibility$ = new Subject<{name: string, selected: boolean}>();
  @Input() inputValue$: Subject<string> = null;
  @Input() reset$ = new Subject<void>();

  onDestroy$ = new Subject<void>();

  get removable() {
    return this.removeButton === true;
  }

  @Input() suggestions: string[] = [];

  @ViewChild('keywordInput') keywordInput: ElementRef;

  constructor() {
  }

  ngOnInit() {
    this.filteredkeywords = this.keywordCtrl.valueChanges.pipe(
      startWith(null),
      map((keyword: string | null) =>
        keyword ?
          this._filter(keyword) :
          (this.suggestions ? this.suggestions.slice() : [])
      )
    );

    // component can be cleared if there is at least
    // a string typed or one or more keywords
    this.dataToClear$ = combineLatest(
      this.inputValue$.pipe(
        map( x => x.trim().length > 0),
        startWith(false)
      ),
      this.keywords$.obs$.pipe(
        map(x => gt(0)(x)),
        startWith(false)
      )
    ).pipe(
      map(([a, b]: [boolean, boolean]) => a || b));
  }

  ngAfterViewInit() {
    if (this.inputValue$) {
      // Put keypress in the inputValue
      fromEvent(this.keywordInput.nativeElement, 'keyup').pipe(
        map(pathOr('', ['srcElement', 'value'])),
        takeUntil(this.onDestroy$),
      ).subscribe(this.inputValue$);
    }
  }

  clear() {
    this.keywordInput.nativeElement.value = '';
    this.reset$.next();
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.unsubscribe();
  }

  inputvaluechange($event) {
    if (this.inputValue$) {
      // TBD:  is it needed ?
     this.inputValue$.next($event.target.value);
    }
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our keyword
    if ((value || '').trim()) {
      this.add$.next({ selected: true, name: value.trim(), id: value.trim() });
      // this.keywords.add$().subscribe();

      // this.keywords.push({ selected: true, name: value.trim() });
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.keywordCtrl.setValue(null);
  }

  remove(id: string): void {
    // this.keywords.removeById(id);
    this.remove$.next(id);
    /*const index = this.keywords.findIndex(f => f.name === keyword);

    if (index >= 0) {
      this.keywords.splice(index, 1);
    }*/
  }

  /*
  onSelect(id: string): void {
    this.keywords.findById$(id).subscribe(keyword => {
      keyword.selected = !keyword.selected;
    });
  }
  */

  selected(event: MatAutocompleteSelectedEvent): void {
    this.add$.next({ selected: true, name: event.option.viewValue });

    this.keywordInput.nativeElement.value = '';
    this.keywordCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.suggestions.filter(keyword => keyword.toLowerCase().indexOf(filterValue) === 0);
  }

  selectionChange(selectionChange: MatChipSelectionChange) {
  }

  toggleVisibility(keyword: KeywordTerm) {
    /*this.keywords.update((state: KeywordTerm[]) => {
      const index = state.findIndex((aKeyword: KeywordTerm) => aKeyword.id === keyword.id);

      const newState = index < 0 ? state : [...state.slice(0, index), {
        ...keyword,
        selected: !keyword.selected
      }, ...state.slice(index + 1)];

      return newState;
    });*/

    this.visibility$.next({name: keyword.name, selected: !keyword.selected });
  }

}
