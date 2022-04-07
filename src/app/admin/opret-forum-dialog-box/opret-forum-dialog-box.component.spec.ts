import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpretForumDialogBoxComponent } from './opret-forum-dialog-box.component';

describe('OpretForumDialogBoxComponent', () => {
  let component: OpretForumDialogBoxComponent;
  let fixture: ComponentFixture<OpretForumDialogBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpretForumDialogBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpretForumDialogBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
