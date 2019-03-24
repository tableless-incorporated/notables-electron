import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagSelectedIconComponent } from './tag-selected-icon.component';

describe('TagSelectedIconComponent', () => {
  let component: TagSelectedIconComponent;
  let fixture: ComponentFixture<TagSelectedIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagSelectedIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagSelectedIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
