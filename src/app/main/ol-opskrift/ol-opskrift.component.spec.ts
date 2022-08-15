import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OlOpskriftComponent } from './ol-opskrift.component';

describe('OlOpskriftComponent', () => {
  let component: OlOpskriftComponent;
  let fixture: ComponentFixture<OlOpskriftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OlOpskriftComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OlOpskriftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
