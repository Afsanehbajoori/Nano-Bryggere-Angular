import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedigerSamarbejdeDialogBoxComponent } from './rediger-samarbejde-dialog-box.component';

describe('RedigerSamarbejdeDialogBoxComponent', () => {
  let component: RedigerSamarbejdeDialogBoxComponent;
  let fixture: ComponentFixture<RedigerSamarbejdeDialogBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RedigerSamarbejdeDialogBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RedigerSamarbejdeDialogBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
