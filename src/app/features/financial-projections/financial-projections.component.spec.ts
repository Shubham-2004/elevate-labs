import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialProjectionsComponent } from './financial-projections.component';

describe('FinancialProjectionsComponent', () => {
  let component: FinancialProjectionsComponent;
  let fixture: ComponentFixture<FinancialProjectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinancialProjectionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinancialProjectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
