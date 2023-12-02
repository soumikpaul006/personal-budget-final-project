// line-chart-3.component.ts
import { Component, Input, OnChanges, SimpleChanges, ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-line-chart-3',
  template: '<canvas #lineChartCanvas></canvas>',
})
export class LineChart3Component implements OnChanges {
  @Input() budgetData: { title: string; amount: number }[] = [];
  @Input() expenseData: { budgetTitle: string; expenseAmount: number }[] = [];

  @ViewChild('lineChartCanvas') lineChartCanvas!: ElementRef<HTMLCanvasElement>;
  private lineChart: Chart;

  ngOnChanges(changes: SimpleChanges): void {
    // console.log('Received budgetData:', this.budgetData);
    // console.log('Received expenseData:', this.expenseData);

    if (this.lineChartCanvas) {
      this.drawChart();
    }
  }

  private drawChart(): void {
    const ctx = this.lineChartCanvas.nativeElement.getContext('2d');

    if (ctx) {
      if (this.lineChart) {
        this.lineChart.destroy();
      }

      const budgetLabels = this.budgetData.map((budget) => budget.title);
      const budgetData = this.budgetData.map((budget) => budget.amount);

      // Group expense data by budgetTitle
      const groupedExpenseData: { [key: string]: number } = {};
      this.expenseData.forEach((expense) => {
        if (!groupedExpenseData[expense.budgetTitle]) {
          groupedExpenseData[expense.budgetTitle] = 0;
        }
        groupedExpenseData[expense.budgetTitle] += expense.expenseAmount;
      });

      const expenseLabels = budgetLabels;
      const expenseData = expenseLabels.map((budgetTitle) => groupedExpenseData[budgetTitle] || 0);

      this.lineChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: budgetLabels,
          datasets: [
            {
              label: 'Budget',
              data: budgetData,
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 2,
              fill: false,
            },
            {
              label: 'Expenses',
              data: expenseData,
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 2,
              fill: false,
            },
          ],
        },
      });
    } else {
      console.error('Canvas context is not available.');
    }
  }
}
