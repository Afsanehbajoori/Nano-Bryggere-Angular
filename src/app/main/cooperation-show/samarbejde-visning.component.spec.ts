import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SamarbejdeVisningComponent } from './samarbejde-visning.component';

describe('SamarbejdeVisningComponent', () => {
  let component: SamarbejdeVisningComponent;
  let fixture: ComponentFixture<SamarbejdeVisningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SamarbejdeVisningComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SamarbejdeVisningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
