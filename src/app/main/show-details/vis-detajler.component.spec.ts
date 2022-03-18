import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisDetajlerComponent } from './vis-detajler.component';

describe('VisDetajlerComponent', () => {
  let component: VisDetajlerComponent;
  let fixture: ComponentFixture<VisDetajlerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisDetajlerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisDetajlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
