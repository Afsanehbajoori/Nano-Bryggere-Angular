import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrugerAdminSideComponent } from './bruger-admin-side.component';

describe('BrugerAdminSideComponent', () => {
  let component: BrugerAdminSideComponent;
  let fixture: ComponentFixture<BrugerAdminSideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrugerAdminSideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrugerAdminSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
