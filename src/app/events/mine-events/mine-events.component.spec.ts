import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MineEventsComponent } from './mine-events.component';

describe('MineEventsComponent', () => {
  let component: MineEventsComponent;
  let fixture: ComponentFixture<MineEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MineEventsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MineEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
