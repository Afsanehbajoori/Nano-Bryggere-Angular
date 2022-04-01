import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpretSamarbejdeDialogBoxComponent } from './opret-samarbejde-dialog-box.component';

describe('OpretSamarbejdeDialogBoxComponent', () => {
  let component: OpretSamarbejdeDialogBoxComponent;
  let fixture: ComponentFixture<OpretSamarbejdeDialogBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpretSamarbejdeDialogBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpretSamarbejdeDialogBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
