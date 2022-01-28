import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrerComponent } from './registrer.component';

describe('RegistrerComponent', () => {
  let component: RegistrerComponent;
  let fixture: ComponentFixture<RegistrerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
