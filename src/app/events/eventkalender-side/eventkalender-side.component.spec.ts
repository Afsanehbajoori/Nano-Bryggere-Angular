import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventkalenderSideComponent } from './eventkalender-side.component';

describe('EventkalenderSideComponent', () => {
  let component: EventkalenderSideComponent;
  let fixture: ComponentFixture<EventkalenderSideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventkalenderSideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventkalenderSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
