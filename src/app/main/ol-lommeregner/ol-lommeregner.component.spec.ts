import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OlLommeregnerComponent } from './ol-lommeregner.component';

describe('OlLommeregnerComponent', () => {
  let component: OlLommeregnerComponent;
  let fixture: ComponentFixture<OlLommeregnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OlLommeregnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OlLommeregnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
