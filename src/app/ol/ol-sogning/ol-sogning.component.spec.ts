import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OlSogningComponent } from './ol-sogning.component';

describe('OlSogningComponent', () => {
  let component: OlSogningComponent;
  let fixture: ComponentFixture<OlSogningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OlSogningComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OlSogningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
