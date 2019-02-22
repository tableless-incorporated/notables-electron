import { Component, OnInit } from '@angular/core';
import { FirebaseService, Note } from '../firebase.service';
import { Observable } from 'rxjs';
import { map as rmap, uniq, reduce, compose, pluck , keys, flatten, lensPath, set} from 'ramda';
import { map } from 'rxjs/operators';
import { TreeNode } from './treenode.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  items$: Observable<TreeNode>;

  constructor(
    public firebaseService: FirebaseService
  ) { }

  ngOnInit() {
    this.items$ = this.firebaseService.getNotes$().pipe(
      map( (listNote: Note[]): TreeNode => {
        return compose(
          list => {
            const list2tree = tags => {
              return compose(
                rmap((name: string) => ({
                  name,
                  children: list2tree(tags[name])
                })),
                keys,
              )(tags);
            };
            return {
              children: list2tree(list)
            };
          },
          reduce((tags, tag) => set(lensPath(tag.split('/')), {}, tags), {}),
          uniq,
          flatten,
          pluck('tags'),
        )(listNote);
      })
    );
  }
}

