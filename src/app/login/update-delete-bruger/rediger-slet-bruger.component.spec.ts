import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedigerSletBrugerComponent } from './rediger-slet-bruger.component';

describe('RedigerSletBrugerComponent', () => {
  let component: RedigerSletBrugerComponent;
  let fixture: ComponentFixture<RedigerSletBrugerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RedigerSletBrugerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RedigerSletBrugerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
