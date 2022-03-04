import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisEventsDetajlerComponent } from './vis-events-detajler.component';

describe('VisEventsDetajlerComponent', () => {
  let component: VisEventsDetajlerComponent;
  let fixture: ComponentFixture<VisEventsDetajlerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisEventsDetajlerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisEventsDetajlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
