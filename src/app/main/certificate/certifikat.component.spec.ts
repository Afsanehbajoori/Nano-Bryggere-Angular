import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertifikatComponent } from './certifikat.component';

describe('CertifikatComponent', () => {
  let component: CertifikatComponent;
  let fixture: ComponentFixture<CertifikatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CertifikatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CertifikatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
