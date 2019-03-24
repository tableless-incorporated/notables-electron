import { AfterViewChecked, Component, HostBinding, Inject, OnInit } from '@angular/core';
import { compose, keys, lensPath, map as rmap, reduce, set } from 'ramda';
import { Observable, of } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { DataService } from '../firefake.service';
import { SearchTermsService } from '../search-terms.service';

export interface TreeNode {
  name: string;
  children?: TreeNode[];
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements AfterViewChecked, OnInit {

  treeData$: Observable<TreeNode[]> = of([]);

  @HostBinding('style.border-right') borderClass = '';
  dataPresent$: Observable<boolean>;

  constructor(
    @Inject('DataService') public firebaseService: DataService,
    public searchTermsService: SearchTermsService
  ) {
    this.treeData$ = this.firebaseService.tags$.pipe(
      map( (listTags: string[]): TreeNode[] => {
        return compose(
          list => {
            const list2tree = tags => {
              return compose(
                rmap((name: string) => {
                  const child = list2tree(tags[name]);
                  const children = child.length ? child : undefined;
                  return { name, children};
                }),
                keys,
              )(tags);
            };
            return  list2tree(list);
          },
          reduce((tags, tag) => set(lensPath(tag.split('/')), {}, tags), {}),
        )(listTags);
      }),
      shareReplay() // needed since treeData is subscribed into an ngIf
    );

    this.dataPresent$ = this.treeData$.pipe(
      map(data => data.length > 0));

  }

  ngOnInit() {

  }

  ngAfterViewChecked() {
    this.dataPresent$.pipe(
    ).subscribe(dataPresent => {
      if (dataPresent) {
        this.borderClass = '1px solid #d8d8d8';
      } else {
        this.borderClass = '';
      }
    });
  }

  onSelect({path, selected}) {
    //// this.tagsService.;
    // this.tagSelectionService.select(path, selected);
    this.searchTermsService.show(path);
  }
}

