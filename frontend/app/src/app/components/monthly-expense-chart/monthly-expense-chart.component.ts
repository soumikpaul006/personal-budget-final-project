import { AfterViewInit, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-monthly-expense-chart',
  template: '<canvas id="monthlyExpenseChart"></canvas>',
  styleUrls: ['./monthly-expense-chart.component.css'],
})
export class MonthlyExpenseChartComponent implements OnChanges, AfterViewInit {
  @Input() monthlyData: { months: string[]; expenses: number[] };

  ngOnChanges(changes: SimpleChanges) {
    if (changes['monthlyData']) {
      // console.log('Monthly Data:', this.monthlyData);
      if (this.monthlyData) {
        this.createChart();
      }
    }
  }

  ngAfterViewInit() {
    this.createChart();
  }

  private createChart() {
    const ctx = document.getElementById('monthlyExpenseChart') as HTMLCanvasElement;
    // console.log('Canvas Element:', ctx);

    // Check if the chart instance already exists and destroy it
    const existingChart = Chart.getChart(ctx);
    if (existingChart) {
      existingChart.destroy();
    }

    // Extract the keys (months) and values (expenses) from the monthlyData object
    const months = Object.keys(this.monthlyData);
    const expenses = Object.values(this.monthlyData);

    const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: months,
        datasets: [
          {
            label: 'Monthly Expenses',
            data: expenses,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }


}
