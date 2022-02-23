import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BryggeriAdminSideComponent } from './bryggeri-admin-side.component';

describe('BryggeriAdminSideComponent', () => {
  let component: BryggeriAdminSideComponent;
  let fixture: ComponentFixture<BryggeriAdminSideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BryggeriAdminSideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BryggeriAdminSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
