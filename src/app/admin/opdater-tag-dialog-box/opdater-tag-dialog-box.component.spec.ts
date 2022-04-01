import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpdaterTagDialogBoxComponent } from './opdater-tag-dialog-box.component';

describe('OpdaterTagDialogBoxComponent', () => {
  let component: OpdaterTagDialogBoxComponent;
  let fixture: ComponentFixture<OpdaterTagDialogBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpdaterTagDialogBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpdaterTagDialogBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
