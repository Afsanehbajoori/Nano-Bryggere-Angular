import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOpretTagComponent } from './admin-opret-tag.component';

describe('AdminOpretTagComponent', () => {
  let component: AdminOpretTagComponent;
  let fixture: ComponentFixture<AdminOpretTagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminOpretTagComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminOpretTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
