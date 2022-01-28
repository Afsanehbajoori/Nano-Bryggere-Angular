import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpretteOlComponent } from './oprette-ol.component';

describe('OpretteOlComponent', () => {
  let component: OpretteOlComponent;
  let fixture: ComponentFixture<OpretteOlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpretteOlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpretteOlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
