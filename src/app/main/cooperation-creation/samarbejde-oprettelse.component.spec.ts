import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SamarbejdeOprettelseComponent } from './samarbejde-oprettelse.component';

describe('SamarbejdeOprettelseComponent', () => {
  let component: SamarbejdeOprettelseComponent;
  let fixture: ComponentFixture<SamarbejdeOprettelseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SamarbejdeOprettelseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SamarbejdeOprettelseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
