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
      height: this.data.getGraphHeight()
    },
    title: {
      text: 'Number of Cases by Month'
    },
    credits: {
      enabled: false
    },
    xAxis: {
      categories: this.data.getAllMonthsNames(),
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
        color: '#26334f',
        showInLegend: false,
        dataLabels: {
          enabled: true,
          align: 'center',
          color: '#000',
        },
      }
    ]
  }
  constructor(public covidService : CovidService) {
    this.month = this.data.getAllMonths();
    this.covidService.getMonthGraphData().subscribe((data) => {
      if(data){
        this.monthGraphData = data;
        for(let i= 0 ; i < this.month.length; i++){
          let monthLabel = this.monthGraphData.find(x => x.month.trim() === this.month[i].id.trim());
          if(monthLabel)
            this.series[i] = parseInt(monthLabel.caseCount);
          else 
            this.series[i] = '';
        }
        Highcharts.chart('container', this.options);
      }
    });
   }

  ngOnInit(): void {}
}
