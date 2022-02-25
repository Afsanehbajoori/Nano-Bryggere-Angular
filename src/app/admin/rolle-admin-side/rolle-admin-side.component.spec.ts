import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolleAdminSideComponent } from './rolle-admin-side.component';

describe('RolleAdminSideComponent', () => {
  let component: RolleAdminSideComponent;
  let fixture: ComponentFixture<RolleAdminSideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RolleAdminSideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RolleAdminSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
