import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetChart1Component } from './budget-chart-1.component';

describe('BudgetChart1Component', () => {
  let component: BudgetChart1Component;
  let fixture: ComponentFixture<BudgetChart1Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BudgetChart1Component]
    });
    fixture = TestBed.createComponent(BudgetChart1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
