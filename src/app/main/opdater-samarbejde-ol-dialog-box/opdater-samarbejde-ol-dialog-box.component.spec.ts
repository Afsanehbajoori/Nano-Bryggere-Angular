import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpdaterSamarbejdeOlDialogBoxComponent } from './opdater-samarbejde-ol-dialog-box.component';

describe('OpdaterSamarbejdeOlDialogBoxComponent', () => {
  let component: OpdaterSamarbejdeOlDialogBoxComponent;
  let fixture: ComponentFixture<OpdaterSamarbejdeOlDialogBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpdaterSamarbejdeOlDialogBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpdaterSamarbejdeOlDialogBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
