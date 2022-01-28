import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlemtPasswordComponent } from './glemt-password.component';

describe('GlemtPasswordComponent', () => {
  let component: GlemtPasswordComponent;
  let fixture: ComponentFixture<GlemtPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GlemtPasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GlemtPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
