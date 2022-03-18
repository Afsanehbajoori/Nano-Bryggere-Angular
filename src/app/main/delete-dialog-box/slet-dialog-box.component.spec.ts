import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SletDialogBoxComponent } from './slet-dialog-box.component';

describe('SletDialogBoxComponent', () => {
  let component: SletDialogBoxComponent;
  let fixture: ComponentFixture<SletDialogBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SletDialogBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SletDialogBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
