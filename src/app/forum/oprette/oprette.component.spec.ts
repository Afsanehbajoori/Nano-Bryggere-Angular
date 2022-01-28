import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpretteComponent } from './oprette.component';

describe('OpretteComponent', () => {
  let component: OpretteComponent;
  let fixture: ComponentFixture<OpretteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpretteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpretteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
