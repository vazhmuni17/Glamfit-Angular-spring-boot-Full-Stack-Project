import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Instagram } from './instagram';

describe('Instagram', () => {
  let component: Instagram;
  let fixture: ComponentFixture<Instagram>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Instagram]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Instagram);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
