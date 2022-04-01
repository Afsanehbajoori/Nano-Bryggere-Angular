import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisSamarbejdeSideComponent } from './vis-samarbejde-side.component';

describe('VisSamarbejdeSideComponent', () => {
  let component: VisSamarbejdeSideComponent;
  let fixture: ComponentFixture<VisSamarbejdeSideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisSamarbejdeSideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisSamarbejdeSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
