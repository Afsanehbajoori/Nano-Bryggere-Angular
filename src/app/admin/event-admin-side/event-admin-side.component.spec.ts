import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventAdminSideComponent } from './event-admin-side.component';

describe('EventAdminSideComponent', () => {
  let component: EventAdminSideComponent;
  let fixture: ComponentFixture<EventAdminSideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventAdminSideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventAdminSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
