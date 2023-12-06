import { Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import {Chart} from 'chart.js/auto';

@Component({
  selector: 'app-budget-chart-1',
  template: '<canvas id="budgetChart" #budgetChartCanvas class="budget-chart-canvas trial"></canvas>',
  styles: ['#budgetChart{ background-color: #f0f0f0;} .budget-chart-canvas { width: 800px !important; height: 800px !important; position: relative; left: 20px; } .trial{ margin-left: 200px;  }'],

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

    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  }

  private drawChart(): void {
    const ctx = this.budgetChartCanvas.nativeElement.getContext('2d');

    if (ctx) {
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
