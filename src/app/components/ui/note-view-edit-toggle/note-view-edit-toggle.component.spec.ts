import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteViewEditToggleComponent } from './note-view-edit-toggle.component';

describe('NoteViewEditToggleComponent', () => {
  let component: NoteViewEditToggleComponent;
  let fixture: ComponentFixture<NoteViewEditToggleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoteViewEditToggleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteViewEditToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
