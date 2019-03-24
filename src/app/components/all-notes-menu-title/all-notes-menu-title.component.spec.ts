import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllNotesMenuTitleComponent } from './all-notes-menu-title.component';

describe('AllNotesMenuTitleComponent', () => {
  let component: AllNotesMenuTitleComponent;
  let fixture: ComponentFixture<AllNotesMenuTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllNotesMenuTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllNotesMenuTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
