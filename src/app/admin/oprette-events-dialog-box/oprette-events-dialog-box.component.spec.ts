import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpretteEventsDialogBoxComponent } from './oprette-events-dialog-box.component';

describe('OpretteEventsDialogBoxComponent', () => {
  let component: OpretteEventsDialogBoxComponent;
  let fixture: ComponentFixture<OpretteEventsDialogBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpretteEventsDialogBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpretteEventsDialogBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
