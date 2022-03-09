import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateEventsDialogBoxComponent } from './update-events-dialog-box.component';

describe('UpdateEventsDialogBoxComponent', () => {
  let component: UpdateEventsDialogBoxComponent;
  let fixture: ComponentFixture<UpdateEventsDialogBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateEventsDialogBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateEventsDialogBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
