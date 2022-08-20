import { Component, OnInit } from '@angular/core';
import { Chart, ChartItem, registerables } from 'chart.js';

@Component({
  selector: 'app-piachart',
  templateUrl: './piachart.component.html',
  styleUrls: ['./piachart.component.scss'],
})
export class PiachartComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    this.createChart()
  }

  createChart(): void {
    Chart.register(...registerables);

    const data = {
      labels: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ],
      datasets: [
        {
          label: 'Analytics this year',
          data: [65, 59, 40, 81, 56, 55, 40, 80, 81, 56, 55, 100],
          backgroundColor: [
            '#1F4D8A',
            '#45A0CE',
            '#45A0CE',
            '#1F4D8A',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            '#1F4D8A',
          ],
          borderColor: [
            '#1F4D8A',
            '#45A0CE',
            '#1F4D8A',
            '#1F4D8A',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            '#1F4D8A',
          ],
          borderWidth: 1,
        },
      ],
    };
    
    const config: any = {
      type: 'bar',
      data: data,
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    };

    const chartItem: ChartItem = document.getElementById(
      'my-chart'
    ) as ChartItem;
    new Chart(chartItem, config);
  }
}
