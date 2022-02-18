import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OlSideComponent } from './ol-side.component';

describe('OlSideComponent', () => {
  let component: OlSideComponent;
  let fixture: ComponentFixture<OlSideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OlSideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OlSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
