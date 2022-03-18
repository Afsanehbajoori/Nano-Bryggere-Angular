import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForsideComponent } from './forside.component';

describe('ForsideComponent', () => {
  let component: ForsideComponent;
  let fixture: ComponentFixture<ForsideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForsideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForsideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
