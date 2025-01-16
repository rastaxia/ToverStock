/* eslint-disable object-shorthand */
/* eslint-disable space-before-function-paren */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { HelperService } from 'src/app/services/helper/helper.service';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.page.html',
  styleUrls: ['./locations.page.scss'],
})
export class LocationsPage implements OnInit {

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined

  public bar_chart_option: ChartConfiguration['options'] = {
    font: {
      family: 'Inter'
    },
    animation: {
      easing: 'easeInOutElastic',
      delay: 25
    },
    responsive: true,
    scales: {
      x: {
        grid: {
          borderColor: this.helperService.getColorVariable('light-shade'),
          color: this.helperService.getColorVariable('light-shade')
        },
        ticks: {
          color: this.helperService.getColorVariable('tertiary'),
          font: {
            family: 'Inter',
            weight: '500'
          }
        }
      },
      y: {
        position: 'right',
        grid: {
          borderColor: this.helperService.getColorVariable('light-shade'),
          color: this.helperService.getColorVariable('light-shade')
        },
        ticks: {
          color: this.helperService.getColorVariable('tertiary'),
          font: {
            family: 'Inter',
            weight: '500'
          },
          callback: function (value, index, ticks) {
            return '€' + value;
          }
        }
      }
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: this.helperService.getColorVariable('light'),
        bodyColor: this.helperService.getColorVariable('primary'),
        titleColor: this.helperService.getColorVariable('tertiary'),
        titleFont: {
          size: 14,
          weight: 'normal'
        },
        bodyFont: {
          size: 16,
          weight: 'bold'
        },
        padding: 12,
        boxWidth: 10,
        boxHeight: 10,
        boxPadding: 3,
        usePointStyle: true,
        callbacks: {
          // Add currency format to tooltip
          label: function (context) {
            var label = context.dataset.label || '';

            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR' }).format(context.parsed.y);
            }
            return label;
          }
        }
      }
    }
  };

  public bar_chart_data: ChartData<'bar'> = {
    labels: [],
    datasets: []
  };

  public bar_chart_type: ChartType = 'bar';

  content_loaded: boolean = false;

  constructor(
    private helperService: HelperService
  ) { }

  ngOnInit() {

    // Create bar chart
    this.createBarChart();
  }

  ionViewDidEnter() {

    // Fake timeout
    setTimeout(() => {
      this.content_loaded = true;
    }, 2000);
  }

  // Create bar chart
  createBarChart() {

    let helperService = this.helperService;

    // Random array of numbers
    let rand_numbers = [...Array(12)].map(e => Math.random() * 100 | 0);

    // Set labels
    this.bar_chart_data.labels = ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];

    // Set datasets
    this.bar_chart_data.datasets = [
      {
        data: rand_numbers,
        backgroundColor: function (context) {

          const chart = context.chart;
          const { ctx, chartArea } = chart;

          if (!chartArea) {
            // This case happens on initial chart load
            return null;
          }

          // Create gradient
          return helperService.createGradientChart(ctx, 'primary', 'primary');
        },
        barThickness: 10,
        borderRadius: 4,
        borderColor: helperService.getColorVariable('primary'),
        hoverBackgroundColor: helperService.getColorVariable('primary'),
        pointStyle: 'circle',
      }
    ];
  }

}
