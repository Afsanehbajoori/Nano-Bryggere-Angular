import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpdaterForumDialogBoxComponent } from './opdater-forum-dialog-box.component';

describe('OpdaterForumDialogBoxComponent', () => {
  let component: OpdaterForumDialogBoxComponent;
  let fixture: ComponentFixture<OpdaterForumDialogBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpdaterForumDialogBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpdaterForumDialogBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
