import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SamarbejdeKatalogComponent } from './samarbejde-katalog.component';

describe('SamarbejdeKatalogComponent', () => {
  let component: SamarbejdeKatalogComponent;
  let fixture: ComponentFixture<SamarbejdeKatalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SamarbejdeKatalogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SamarbejdeKatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
