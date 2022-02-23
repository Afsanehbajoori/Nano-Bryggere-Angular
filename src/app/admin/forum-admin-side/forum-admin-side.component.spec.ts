import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumAdminSideComponent } from './forum-admin-side.component';

describe('ForumAdminSideComponent', () => {
  let component: ForumAdminSideComponent;
  let fixture: ComponentFixture<ForumAdminSideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForumAdminSideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForumAdminSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
