import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpretSamarbejdeOlDialogBoxComponent } from './opret-samarbejde-ol-dialog-box.component';

describe('OpretSamarbejdeOlDialogBoxComponent', () => {
  let component: OpretSamarbejdeOlDialogBoxComponent;
  let fixture: ComponentFixture<OpretSamarbejdeOlDialogBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpretSamarbejdeOlDialogBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpretSamarbejdeOlDialogBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
