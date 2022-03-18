import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SletProfilComponent } from './slet-profil.component';

describe('SletProfilComponent', () => {
  let component: SletProfilComponent;
  let fixture: ComponentFixture<SletProfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SletProfilComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SletProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
