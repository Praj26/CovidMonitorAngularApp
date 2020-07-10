import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { Data } from '../data';
import { CovidService } from '../covid.service'

declare var require: any;
let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');

Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);

@Component({
  selector: 'app-month-display',
  templateUrl: './month-display.component.html',
  styleUrls: ['./month-display.component.css']
})
export class MonthDisplayComponent implements OnInit {
  public data = new Data()
  public monthGraphData;
  public month = [];
  public series = [];
  public xAxis = []
  public options: any = {
    chart: {
      type: 'column',
      height: 450
    },
    title: {
      text: 'Month'
    },
    credits: {
      enabled: false
    },
    xAxis: {
      categories: this.xAxis,
      title: {
        text: 'Months'
      }
    },
    yAxis: {
      title: {
        text: 'Number of Cases'
      }
    },
    series: [
      {
        data: this.series,
        color: '#26334f'
      }
    ]
  }
  constructor(public covidService : CovidService) {
    this.month = this.data.getAllMonths();
    this.monthGraphData = this.covidService.getMonthGraphData();
    for(let i= 0 ; i<this.monthGraphData.length;i++){
      let monthLabel = this.month.find(x => x.id === this.monthGraphData[i].month.trim());
      this.xAxis[i] = monthLabel.name;
      this.series[i] = parseInt(this.monthGraphData[i].caseCount);
    }
   }

  ngOnInit(): void {
    Highcharts.chart('container', this.options);
  }

}
