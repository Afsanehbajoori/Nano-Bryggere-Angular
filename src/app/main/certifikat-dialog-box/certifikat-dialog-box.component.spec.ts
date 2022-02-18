import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertifikatDialogBoxComponent } from './certifikat-dialog-box.component';

describe('CertifikatDialogBoxComponent', () => {
  let component: CertifikatDialogBoxComponent;
  let fixture: ComponentFixture<CertifikatDialogBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CertifikatDialogBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CertifikatDialogBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
