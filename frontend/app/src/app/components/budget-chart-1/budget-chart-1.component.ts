import { Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import {Chart} from 'chart.js/auto';

@Component({
  selector: 'app-budget-chart-1',
  template: '<canvas #budgetChartCanvas class="budget-chart-canvas"></canvas>',
  styles: ['.budget-chart-canvas { width: 200px; height: 200px; }'],
})
export class BudgetChart1Component implements OnChanges {
  @Input() budgetData: { title: string; amount: number }[] = [];

  @ViewChild('budgetChartCanvas') budgetChartCanvas!: ElementRef<HTMLCanvasElement>;
  chart: any;

  ngAfterViewInit(): void {
    this.drawChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.budgetChartCanvas) {
      this.drawChart();
    }
  }


  private getRandomColor(): string {
    // Generate a random color in the format '#RRGGBB'
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  }

  private drawChart(): void {
    const ctx = this.budgetChartCanvas.nativeElement.getContext('2d');

    if (ctx) {
      // Destroy the existing chart if it exists
      if (this.chart) {
        this.chart.destroy();
      }

      const labels = this.budgetData.map((budget) => budget.title);
      const data = this.budgetData.map((budget) => budget.amount);


      const backgroundColor = this.budgetData.map(() => this.getRandomColor());

      this.chart = new Chart(ctx, {
        type: 'pie',
        data: {
          labels,
          datasets: [
            {
              data,
              backgroundColor,
            },
          ],
        },
      });
    } else {
      console.error('Canvas context is not available.');
    }
  }
}
