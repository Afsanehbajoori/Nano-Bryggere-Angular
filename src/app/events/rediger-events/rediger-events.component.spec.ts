import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedigerEventsComponent } from './rediger-events.component';

describe('RedigerEventsComponent', () => {
  let component: RedigerEventsComponent;
  let fixture: ComponentFixture<RedigerEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RedigerEventsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RedigerEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
