import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpdaterSamarbejdeDialogBoxComponent } from './opdater-samarbejde-dialog-box.component';

describe('OpdaterSamarbejdeDialogBoxComponent', () => {
  let component: OpdaterSamarbejdeDialogBoxComponent;
  let fixture: ComponentFixture<OpdaterSamarbejdeDialogBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpdaterSamarbejdeDialogBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpdaterSamarbejdeDialogBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
