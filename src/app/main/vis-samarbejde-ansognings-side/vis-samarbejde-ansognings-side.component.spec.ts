import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisSamarbejdeAnsogningsSideComponent } from './vis-samarbejde-ansognings-side.component';

describe('VisSamarbejdeAnsogningsSideComponent', () => {
  let component: VisSamarbejdeAnsogningsSideComponent;
  let fixture: ComponentFixture<VisSamarbejdeAnsogningsSideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisSamarbejdeAnsogningsSideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisSamarbejdeAnsogningsSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
