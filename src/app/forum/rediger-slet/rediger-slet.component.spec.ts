import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedigerSletComponent } from './rediger-slet.component';

describe('RedigerSletComponent', () => {
  let component: RedigerSletComponent;
  let fixture: ComponentFixture<RedigerSletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RedigerSletComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RedigerSletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
