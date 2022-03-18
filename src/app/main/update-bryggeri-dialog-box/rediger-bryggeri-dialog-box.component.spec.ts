import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedigerBryggeriDialogBoxComponent } from './rediger-bryggeri-dialog-box.component';

describe('RedigerBryggeriDialogBoxComponent', () => {
  let component: RedigerBryggeriDialogBoxComponent;
  let fixture: ComponentFixture<RedigerBryggeriDialogBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RedigerBryggeriDialogBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RedigerBryggeriDialogBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
