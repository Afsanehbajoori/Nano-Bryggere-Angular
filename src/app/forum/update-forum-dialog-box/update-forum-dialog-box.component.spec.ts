import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateForumDialogBoxComponent } from './update-forum-dialog-box.component';

describe('UpdateForumDialogBoxComponent', () => {
  let component: UpdateForumDialogBoxComponent;
  let fixture: ComponentFixture<UpdateForumDialogBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateForumDialogBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateForumDialogBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
