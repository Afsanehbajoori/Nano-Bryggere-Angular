import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumTagsComponent } from './forum-tags.component';

describe('ForumTagsComponent', () => {
  let component: ForumTagsComponent;
  let fixture: ComponentFixture<ForumTagsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForumTagsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForumTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
