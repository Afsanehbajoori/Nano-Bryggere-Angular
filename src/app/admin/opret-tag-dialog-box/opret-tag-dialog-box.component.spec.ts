import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpretTagDialogBoxComponent } from './opret-tag-dialog-box.component';

describe('OpretTagDialogBoxComponent', () => {
  let component: OpretTagDialogBoxComponent;
  let fixture: ComponentFixture<OpretTagDialogBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpretTagDialogBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpretTagDialogBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
