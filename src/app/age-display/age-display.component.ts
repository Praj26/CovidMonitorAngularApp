import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { CovidService } from '../covid.service'
import { Data } from '../data';

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
  public ageGraphData;
  public xAxis : any = [];
  public series : any = [];
  public highChartHeight = 0;
  public data = new Data();
  public options: any = {
    chart: {
      type: 'column',
      height: this.data.getGraphHeight()
    },
    title: {
      text: 'Number of cases by Age'
    },
    credits: {
      enabled: false
    },
    xAxis: {
      categories: this.data.getAgeGroup(),
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
        color: '#26334f',
        showInLegend: false,
        dataLabels: {
          enabled: true,
          align: 'center',
          color: '#000',
        },
      },
    ]
  }
  constructor(public covidService : CovidService) { 
    this.xAxis = this.data.getAgeGroup();
    let series_copy = [0, 0, 0, 0, 0, 0];
    this.covidService.getAgeGraphData().subscribe((data)  => {
      this.ageGraphData = data;
      for(let i=0;i<this.ageGraphData.length;i++){
        for(let j=0;j<this.xAxis.length;j++){
          if(parseInt(this.xAxis[j].split(/[+,-]/)[0]) <= this.ageGraphData[i].age && this.xAxis[j].split(/[+,-]/)[1] >= parseInt(this.ageGraphData[i].age))
          {
            series_copy[j] += this.ageGraphData[i].caseCount;
            break;
          } 
          else if(parseInt(this.xAxis[j].split(/[+,-]/)[0]) <= this.ageGraphData[i].age && this.xAxis[j].split(/[+,-]/)[1] == ""){
            series_copy[j] += this.ageGraphData[i].caseCount;
            break;
          }
        }
      }
      for(let i=0;i<series_copy.length;i++){
        if(series_copy[i]==0)
          this.series[i] = ''
        else
          this.series[i] = series_copy[i];
      }
      Highcharts.chart('container', this.options);
    });
  }

  ngOnInit(){
    this.highChartHeight = document.getElementById('container').offsetHeight
    this.data.setGraphHeight(this.highChartHeight);
  }
}
