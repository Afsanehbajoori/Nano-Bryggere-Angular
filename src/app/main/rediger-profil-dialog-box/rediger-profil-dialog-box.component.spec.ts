import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedigerProfilDialogBoxComponent } from './rediger-profil-dialog-box.component';

describe('RedigerProfilDialogBoxComponent', () => {
  let component: RedigerProfilDialogBoxComponent;
  let fixture: ComponentFixture<RedigerProfilDialogBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RedigerProfilDialogBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RedigerProfilDialogBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
