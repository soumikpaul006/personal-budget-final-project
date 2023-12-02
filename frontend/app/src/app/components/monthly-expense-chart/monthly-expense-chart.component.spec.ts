import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyExpenseChartComponent } from './monthly-expense-chart.component';

describe('MonthlyExpenseChartComponent', () => {
  let component: MonthlyExpenseChartComponent;
  let fixture: ComponentFixture<MonthlyExpenseChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MonthlyExpenseChartComponent]
    });
    fixture = TestBed.createComponent(MonthlyExpenseChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
