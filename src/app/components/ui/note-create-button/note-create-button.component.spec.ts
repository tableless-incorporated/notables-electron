import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteCreateButtonComponent } from './note-create-button.component';

describe('NoteCreateButtonComponent', () => {
  let component: NoteCreateButtonComponent;
  let fixture: ComponentFixture<NoteCreateButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoteCreateButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteCreateButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
