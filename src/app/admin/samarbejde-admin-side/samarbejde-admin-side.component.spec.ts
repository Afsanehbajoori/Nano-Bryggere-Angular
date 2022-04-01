import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SamarbejdeAdminSideComponent } from './samarbejde-admin-side.component';

describe('SamarbejdeAdminSideComponent', () => {
  let component: SamarbejdeAdminSideComponent;
  let fixture: ComponentFixture<SamarbejdeAdminSideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SamarbejdeAdminSideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SamarbejdeAdminSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
