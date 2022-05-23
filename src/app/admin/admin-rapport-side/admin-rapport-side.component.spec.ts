import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRapportSideComponent } from './admin-rapport-side.component';

describe('AdminRapportSideComponent', () => {
  let component: AdminRapportSideComponent;
  let fixture: ComponentFixture<AdminRapportSideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminRapportSideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminRapportSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
