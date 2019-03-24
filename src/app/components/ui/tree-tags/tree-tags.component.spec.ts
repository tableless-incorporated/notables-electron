import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeTagsComponent } from './tree-tags.component';

describe('TreeTagsComponent', () => {
  let component: TreeTagsComponent;
  let fixture: ComponentFixture<TreeTagsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreeTagsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
