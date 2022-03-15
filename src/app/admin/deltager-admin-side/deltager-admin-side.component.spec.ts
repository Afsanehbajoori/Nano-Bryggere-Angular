import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeltagerAdminSideComponent } from './deltager-admin-side.component';

describe('DeltagerAdminSideComponent', () => {
  let component: DeltagerAdminSideComponent;
  let fixture: ComponentFixture<DeltagerAdminSideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeltagerAdminSideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeltagerAdminSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
