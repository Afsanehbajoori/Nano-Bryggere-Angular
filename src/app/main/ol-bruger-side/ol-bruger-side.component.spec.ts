import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OlBrugerSideComponent } from './ol-bruger-side.component';

describe('OlBrugerSideComponent', () => {
  let component: OlBrugerSideComponent;
  let fixture: ComponentFixture<OlBrugerSideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OlBrugerSideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OlBrugerSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
