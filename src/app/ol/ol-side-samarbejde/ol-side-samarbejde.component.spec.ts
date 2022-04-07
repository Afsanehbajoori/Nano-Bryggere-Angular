import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OlSideSamarbejdeComponent } from './ol-side-samarbejde.component';

describe('OlSideSamarbejdeComponent', () => {
  let component: OlSideSamarbejdeComponent;
  let fixture: ComponentFixture<OlSideSamarbejdeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OlSideSamarbejdeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OlSideSamarbejdeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
