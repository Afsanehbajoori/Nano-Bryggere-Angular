import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpretTagsDialogBoxComponent } from './opret-tags-dialog-box.component';

describe('OpretTagsDialogBoxComponent', () => {
  let component: OpretTagsDialogBoxComponent;
  let fixture: ComponentFixture<OpretTagsDialogBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpretTagsDialogBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpretTagsDialogBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
