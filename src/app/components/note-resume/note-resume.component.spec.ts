import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteResumeComponent } from './note-resume.component';

describe('NoteResumeComponent', () => {
  let component: NoteResumeComponent;
  let fixture: ComponentFixture<NoteResumeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoteResumeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
