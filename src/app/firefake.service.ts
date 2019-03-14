import { Injectable } from '@angular/core';
import { map, reduce, tap } from 'rxjs/operators';
import { compose, range, uniq, flatten, pluck } from 'ramda';
import { Observable, of } from 'rxjs';
import { Note } from './firebase.service';
import { ObjList } from 'storyx';

type TagPath = string[];

export interface DataService {

    tags$: Observable<string[]>;

    // dataPresent$: Observable<boolean>;
    getNotes$(tags: TagPath[]): Observable<Note[]> ;

    createNote(note) ;

    deleteNote(note): void ;

    updateNote(note): void ;
}

@Injectable()
export class FirefakeService  extends ObjList<Note> implements DataService {
  id: 2;

  constructor() {
    super([
      new Note({  id: '0',
        body : `
## Ceci est un titre

Ceci est du texte

![avec une image](http://lorempixel.com/400/200/)

[Lien http](http://lemonde.fr)
        `,
        tags: ['a/a', 'a/b', 'c', 'c/d']
      }),
      ...range(1, 100).map((_, id) => new Note({  id: '' + (id + 1),
        body : `

Aliquam vehicula, odio sed sodales dignissim, nulla lectus mattis sapien, quis scelerisque nunc nibh a elit. Praesent condimentum nisl eu massa convallis posuere. Quisque in dui consequat, vestibulum erat molestie, finibus tellus. Nunc pellentesque eros sit amet bibendum posuere. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aliquam tortor ante, fermentum sit amet quam ut, mattis mattis ipsum. Nulla et pharetra ante. Donec consectetur nisl quis dui accumsan, eu fermentum arcu fermentum. Etiam dictum ligula turpis, eget convallis nisi volutpat sit amet. Nunc pulvinar elit a nisl hendrerit, nec condimentum neque suscipit. Praesent et interdum mauris. Maecenas finibus nisi vitae leo accumsan ornare. Proin elementum, sem ut scelerisque lacinia, neque nisi ornare orci, nec suscipit velit dolor et nisl. Praesent interdum semper volutpat. Suspendisse facilisis ex turpis, ut euismod mi aliquam quis. Cras ultricies metus non ex molestie luctus.

Quisque dignissim diam vel ipsum maximus consectetur. Etiam ut erat sapien. Nulla quis tempus nisl, in semper urna. Curabitur fringilla urna non enim fringilla, at fringilla lacus fringilla. Maecenas nec vulputate lectus. In hac habitasse platea dictumst. Aenean dictum, odio quis tincidunt rutrum, magna turpis tristique sem, tincidunt pharetra eros turpis eget sem. Etiam molestie quis metus dictum elementum. Sed sagittis ultricies magna finibus tempor. Vivamus nec maximus lacus. Aenean eget justo lorem. Maecenas posuere aliquam sapien ac aliquet. Duis at congue diam.

Pellentesque finibus, ipsum ut pretium mattis, elit nulla gravida elit, ut facilisis risus magna et odio. Nunc mattis nisl id leo sollicitudin bibendum. Nam tempor, augue blandit feugiat ultricies, urna neque euismod ligula, id sollicitudin sem ex at arcu. Aliquam erat volutpat. Nam non facilisis nisi. Quisque eget dictum lacus. Nulla dolor risus, volutpat quis aliquam eget, varius nec nulla. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pharetra eget metus rhoncus maximus. Nulla ac leo justo. Vivamus suscipit viverra finibus. Praesent non sollicitudin metus. Vivamus blandit venenatis sapien, luctus ultrices ante vehicula nec. Etiam facilisis nulla eu condimentum suscipit.

Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce posuere eros pulvinar ligula ultrices egestas. Fusce pulvinar, sapien sed suscipit molestie, arcu ante tristique justo, vel laoreet ipsum elit quis quam. Vestibulum semper aliquam tellus eget bibendum. Nam volutpat eleifend urna at porta. Quisque blandit accumsan ante, eu tempus risus vulputate vitae. Donec lacinia interdum accumsan. Maecenas fermentum ipsum neque, non tincidunt erat mattis vel. In hac habitasse platea dictumst. Vivamus sapien sem, suscipit ac ultricies quis, fringilla nec justo. Morbi sit amet urna consectetur, mollis ex eu, viverra ex. Phasellus non luctus purus. Proin et felis nec neque efficitur consectetur. Maecenas quis nisi ipsum. Donec in porta augue. Donec nunc mi, cursus quis arcu eget, fermentum tempus augue.

Ut dapibus odio nisl, non accumsan urna volutpat ut. Integer sit amet dignissim sem. Donec volutpat sed turpis vel pretium. Aliquam pretium, dui eu accumsan consectetur, massa massa lobortis lorem, eget facilisis est orci ut velit. Proin porttitor eget tortor id commodo. Sed ut fringilla leo. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec vel mollis nisi. Etiam molestie ipsum ut est pharetra, sed eleifend justo commodo. Donec condimentum tellus quis felis iaculis sodales. Curabitur id molestie mauris. Donec sodales scelerisque convallis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec bibendum lorem ut turpis imperdiet, ut maximus eros condimentum.`,
        tags: ['a/a', 'a/b', 'c', 'c/d']
      }))
    ], 'id');
  }

  user$ = of(true);

  get tags$() {
    return this.getNotes$([]).pipe(
      map( (listNote: Note[]): string[] => {
        return compose(
          uniq,
          flatten,
          pluck('tags'),
        )(listNote);
      }),
    );
  }

  getNotes$(tags: TagPath[] = []): Observable<Note[]> {
    return this.obs$;
  }

  createNote(note) {
    note.id = undefined;
    this.id++;
    this.add$(note).subscribe();
    return of(note).toPromise();
  }

  deleteNote(note) {
    return this.removeById(note.id);
  }

  updateNote(note) {
    // this.add$(note.raw);
    return this.update(
      notes => {
        const idx = notes.findIndex(n => n.id = note.id);
        if (idx < 0) { return note; }
        console.dir(note);
        console.dir(notes);
        console.dir(idx);
        console.dir(notes.slice(0, idx));
        console.dir(notes.slice(idx + 1));
        return [
          ...notes.slice(0, idx),
          note,
          ...notes.slice(idx + 1)
        ];
      }
    );
  }
}
