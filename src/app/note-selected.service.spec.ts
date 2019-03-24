import { TestBed } from '@angular/core/testing';

import { NoteSelectedService } from './note-selected.service';

describe('NoteSelectedService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NoteSelectedService = TestBed.get(NoteSelectedService);
    expect(service).toBeTruthy();
  });
});
