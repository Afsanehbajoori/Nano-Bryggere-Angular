import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SamarbejdeSideComponent } from './samarbejde-side.component';

describe('SamarbejdeSideComponent', () => {
  let component: SamarbejdeSideComponent;
  let fixture: ComponentFixture<SamarbejdeSideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SamarbejdeSideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SamarbejdeSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
