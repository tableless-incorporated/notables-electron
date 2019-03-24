import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagsListMenuTitleComponent } from './tags-list-menu-title.component';

describe('TagsListMenuTitleComponent', () => {
  let component: TagsListMenuTitleComponent;
  let fixture: ComponentFixture<TagsListMenuTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagsListMenuTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagsListMenuTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
