import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTagsDialogBoxComponent } from './update-tags-dialog-box.component';

describe('UpdateTagsDialogBoxComponent', () => {
  let component: UpdateTagsDialogBoxComponent;
  let fixture: ComponentFixture<UpdateTagsDialogBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateTagsDialogBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateTagsDialogBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
