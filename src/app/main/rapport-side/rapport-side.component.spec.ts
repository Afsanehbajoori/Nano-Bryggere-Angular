import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RapportSideComponent } from './rapport-side.component';

describe('RapportSideComponent', () => {
  let component: RapportSideComponent;
  let fixture: ComponentFixture<RapportSideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RapportSideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RapportSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
