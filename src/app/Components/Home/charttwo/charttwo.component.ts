import { Component, OnInit } from '@angular/core';
import { Chart, ChartItem, registerables } from 'chart.js';

@Component({
  selector: 'app-charttwo',
  templateUrl: './charttwo.component.html',
  styleUrls: ['./charttwo.component.scss']
})
export class CharttwoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.createChart()
  }
  createChart(): void{
    Chart.register(...registerables);
    const data = {
      labels: [
        'Apple',
        'Lg',
        'Samsung'
      ],
      datasets: [{
        label: 'most brands selles',
        data: [300, 50, 100],
        backgroundColor: [
          '#A2AAAD',
          '#990033',
          '#1428a0'
        ],
        hoverOffset: 4
      }]
    };
    const config:any = {
      type: 'pie',
      data: data,
    };
    const chartItem: ChartItem = document.getElementById(
      'my-chart-two'
    ) as ChartItem;
    new Chart(chartItem, config);
  }

}
