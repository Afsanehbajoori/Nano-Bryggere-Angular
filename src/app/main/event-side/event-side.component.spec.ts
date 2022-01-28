import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventSideComponent } from './event-side.component';

describe('EventSideComponent', () => {
  let component: EventSideComponent;
  let fixture: ComponentFixture<EventSideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventSideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
