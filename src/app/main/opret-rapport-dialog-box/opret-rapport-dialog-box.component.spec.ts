import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpretRapportDialogBoxComponent } from './opret-rapport-dialog-box.component';

describe('OpretRapportDialogBoxComponent', () => {
  let component: OpretRapportDialogBoxComponent;
  let fixture: ComponentFixture<OpretRapportDialogBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpretRapportDialogBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpretRapportDialogBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
