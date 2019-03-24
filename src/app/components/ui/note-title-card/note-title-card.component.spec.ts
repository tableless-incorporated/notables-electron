import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteTitleCardComponent } from './note-title-card.component';

describe('NoteTitleCardComponent', () => {
  let component: NoteTitleCardComponent;
  let fixture: ComponentFixture<NoteTitleCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoteTitleCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteTitleCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
