import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrugerCertifikatComponent } from './bruger-certifikat.component';

describe('BrugerCertifikatComponent', () => {
  let component: BrugerCertifikatComponent;
  let fixture: ComponentFixture<BrugerCertifikatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrugerCertifikatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrugerCertifikatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
