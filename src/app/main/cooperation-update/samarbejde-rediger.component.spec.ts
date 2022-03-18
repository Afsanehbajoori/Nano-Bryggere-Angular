import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SamarbejdeRedigerComponent } from './samarbejde-rediger.component';

describe('SamarbejdeRedigerComponent', () => {
  let component: SamarbejdeRedigerComponent;
  let fixture: ComponentFixture<SamarbejdeRedigerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SamarbejdeRedigerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SamarbejdeRedigerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
