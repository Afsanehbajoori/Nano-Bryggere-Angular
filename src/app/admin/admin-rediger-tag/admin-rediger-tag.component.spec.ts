import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRedigerTagComponent } from './admin-rediger-tag.component';

describe('AdminRedigerTagComponent', () => {
  let component: AdminRedigerTagComponent;
  let fixture: ComponentFixture<AdminRedigerTagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminRedigerTagComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminRedigerTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
