import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteResumesComponent } from './note-resumes.component';

describe('NoteResumesComponent', () => {
  let component: NoteResumesComponent;
  let fixture: ComponentFixture<NoteResumesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoteResumesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteResumesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
