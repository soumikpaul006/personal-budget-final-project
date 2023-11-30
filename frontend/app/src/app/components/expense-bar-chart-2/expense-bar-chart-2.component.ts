import { Component, Input, OnChanges, SimpleChanges, ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-expense-bar-chart-2',
  template: '<canvas #expenseBarChartCanvas></canvas>',
})
export class ExpenseBarChart2Component implements OnChanges {
  @Input() budgetData: { title: string; amount: number }[] = [];
  @Input() expenseData: { budgetTitle: string; expenseAmount: number }[] = [];

  @ViewChild('expenseBarChartCanvas') expenseBarChartCanvas!: ElementRef<HTMLCanvasElement>;
  private expenseBarChart: Chart;

  ngOnChanges(changes: SimpleChanges): void {
    console.log('Received budgetData:', this.budgetData);
    console.log('Received expenseData:', this.expenseData);

    if (this.expenseBarChartCanvas) {
      this.drawChart();
    }
  }


  private drawChart(): void {
    const ctx = this.expenseBarChartCanvas.nativeElement.getContext('2d');

    if (ctx) {
      // Destroy the existing chart if it exists
      if (this.expenseBarChart) {
        this.expenseBarChart.destroy();
      }

      // Extract data for the chart
      const budgetLabels = this.budgetData.map((budget) => budget.title);
      const budgetData = this.budgetData.map((budget) => budget.amount);

      // Group expense data by budgetTitle
      const groupedExpenseData: { [key: string]: number } = {};
      this.expenseData.forEach((expense) => {
        if (groupedExpenseData[expense.budgetTitle] === undefined) {
          groupedExpenseData[expense.budgetTitle] = 0;
        }
        groupedExpenseData[expense.budgetTitle] += expense.expenseAmount;
      });

      // Align expense data with budget labels
      const expenseData = budgetLabels.map((budgetLabel) => groupedExpenseData[budgetLabel] || 0);

      // Calculate the bar width based on the number of datasets
      const barWidth = 1; // Adjust as needed

      // Create the bar chart
      this.expenseBarChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: budgetLabels,
          datasets: [
            {
              label: 'Budget',
              data: budgetData,
              backgroundColor: 'rgba(54, 162, 235, 0.7)',
            },
            {
              label: 'Expenses',
              data: expenseData,
              backgroundColor: 'rgba(255, 99, 132, 0.7)',
              barPercentage: barWidth,
            },
          ],
        },
      });
    } else {
      console.error('Canvas context is not available.');
    }
  }
}

