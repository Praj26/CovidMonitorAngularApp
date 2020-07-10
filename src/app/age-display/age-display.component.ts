import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
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
  selector: 'app-age-display',
  templateUrl: './age-display.component.html',
  styleUrls: ['./age-display.component.css']
})
export class AgeDisplayComponent implements OnInit {

  title = 'CovidMonitor';
  public ageGraphData : [];
  public xAxis : any = [];
  public series : any = [];
  public options: any = {
    chart: {
      type: 'column',
      height: 450
    },
    title: {
      text: ''
    },
    credits: {
      enabled: false
    },
    xAxis: {
      categories: this.xAxis,
      title: {
        text: 'Age'
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
      },
    ]
  }
  constructor(public covidService : CovidService) { 
    let ageGraphData = this.covidService.getAgeGraphData();
    for(let i=0;i<ageGraphData.length;i++){
      this.xAxis[i] = ageGraphData[i].ageGroup;
      this.series[i] = parseInt(ageGraphData[i].caseCount);
      
    }
    console.log(this.series);
  }

  ngOnInit(){
    Highcharts.chart('container', this.options);
  }
}
