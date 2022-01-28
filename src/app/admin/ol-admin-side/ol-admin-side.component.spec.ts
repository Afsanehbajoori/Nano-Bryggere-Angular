import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OlAdminSideComponent } from './ol-admin-side.component';

describe('OlAdminSideComponent', () => {
  let component: OlAdminSideComponent;
  let fixture: ComponentFixture<OlAdminSideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OlAdminSideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OlAdminSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
