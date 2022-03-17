import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePostDialogBoxComponent } from './update-post-dialog-box.component';

describe('UpdatePostDialogBoxComponent', () => {
  let component: UpdatePostDialogBoxComponent;
  let fixture: ComponentFixture<UpdatePostDialogBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatePostDialogBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePostDialogBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
