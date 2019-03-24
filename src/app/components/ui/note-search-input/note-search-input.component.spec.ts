import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteSearchInputComponent } from './note-search-input.component';

describe('NoteSearchInputComponent', () => {
  let component: NoteSearchInputComponent;
  let fixture: ComponentFixture<NoteSearchInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoteSearchInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteSearchInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
