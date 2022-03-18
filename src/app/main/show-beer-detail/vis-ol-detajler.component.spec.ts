import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisOlDetajlerComponent } from './vis-ol-detajler.component';

describe('VisOlDetajlerComponent', () => {
  let component: VisOlDetajlerComponent;
  let fixture: ComponentFixture<VisOlDetajlerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisOlDetajlerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisOlDetajlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
