import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OlLagerComponent } from './ol-lager.component';

describe('OlLagerComponent', () => {
  let component: OlLagerComponent;
  let fixture: ComponentFixture<OlLagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OlLagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OlLagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
