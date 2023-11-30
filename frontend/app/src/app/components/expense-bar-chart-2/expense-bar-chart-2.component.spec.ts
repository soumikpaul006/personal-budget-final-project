import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseBarChart2Component } from './expense-bar-chart-2.component';

describe('ExpenseBarChart2Component', () => {
  let component: ExpenseBarChart2Component;
  let fixture: ComponentFixture<ExpenseBarChart2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExpenseBarChart2Component]
    });
    fixture = TestBed.createComponent(ExpenseBarChart2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
