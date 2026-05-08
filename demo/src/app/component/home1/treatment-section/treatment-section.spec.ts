import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreatmentSection } from './treatment-section';

describe('TreatmentSection', () => {
  let component: TreatmentSection;
  let fixture: ComponentFixture<TreatmentSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TreatmentSection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TreatmentSection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
