import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedigerOlComponent } from './rediger-ol.component';

describe('RedigerOlComponent', () => {
  let component: RedigerOlComponent;
  let fixture: ComponentFixture<RedigerOlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RedigerOlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RedigerOlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
