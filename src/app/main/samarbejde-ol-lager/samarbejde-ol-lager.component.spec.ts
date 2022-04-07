import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SamarbejdeOlLagerComponent } from './samarbejde-ol-lager.component';

describe('SamarbejdeOlLagerComponent', () => {
  let component: SamarbejdeOlLagerComponent;
  let fixture: ComponentFixture<SamarbejdeOlLagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SamarbejdeOlLagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SamarbejdeOlLagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
