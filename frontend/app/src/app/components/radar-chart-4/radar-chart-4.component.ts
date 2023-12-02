import { Component, Input, OnChanges, SimpleChanges, ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-radar-chart-4',
  template: '<canvas #radarChartCanvas></canvas>',
})
export class RadarChart4Component implements OnChanges {
  @Input() budgetData: { title: string; amount: number }[] = [];
  @Input() expenseData: { budgetTitle: string; expenseAmount: number }[] = [];

  @ViewChild('radarChartCanvas') radarChartCanvas!: ElementRef<HTMLCanvasElement>;
  private radarChart: Chart;

  ngOnChanges(changes: SimpleChanges): void {
    // console.log('Received budgetData:', this.budgetData);
    // console.log('Received expenseData:', this.expenseData);

    if (this.radarChartCanvas) {
      this.drawChart();
    }
  }

  private drawChart(): void {
    const ctx = this.radarChartCanvas.nativeElement.getContext('2d');

    if (ctx) {
      if (this.radarChart) {
        this.radarChart.destroy();
      }


      const labels = this.budgetData.map((budget) => budget.title);
      const budgetData = this.budgetData.map((budget) => budget.amount);


      const groupedExpenseData: { [key: string]: number } = {};
      this.expenseData.forEach((expense) => {
        if (groupedExpenseData[expense.budgetTitle] === undefined) {
          groupedExpenseData[expense.budgetTitle] = 0;
        }
        groupedExpenseData[expense.budgetTitle] += expense.expenseAmount;
      });

      const expenseData = labels.map((title) => groupedExpenseData[title] || 0);

      this.radarChart = new Chart(ctx, {
        type: 'radar',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Budget',
              data: budgetData,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 2,
              pointBackgroundColor: 'rgba(75, 192, 192, 1)',
            },
            {
              label: 'Expenses',
              data: expenseData,
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 2,
              pointBackgroundColor: 'rgba(255, 99, 132, 1)',
            },
          ],
        },
      });
    } else {
      console.error('Canvas context is not available.');
    }
  }
}
