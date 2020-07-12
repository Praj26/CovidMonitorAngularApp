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
  selector: 'app-location-display',
  templateUrl: './location-display.component.html',
  styleUrls: ['./location-display.component.css']
})
export class LocationDisplayComponent implements OnInit {
  public locationGraphData;
  public data = new Data();
  public cities;
  public xAxis = [];
  public series = [];
  public options: any = {
    chart: {
      type: 'column',
      height: this.data.getGraphHeight()
    },
    title: {
      text: 'Number of cases by Location'
    },
    credits: {
      enabled: false
    },
    xAxis: {
      categories: this.xAxis,
      title: {
        text: 'Cities'
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
    this.cities = this.data.getAllCities();
    this.covidService.getLocationGraphData().subscribe((data) => {
      if(data){
        this.locationGraphData = data
        for(let i= 0 ; i<this.locationGraphData.length;i++){
          let cityLabel = this.cities.find(x => x.id === this.locationGraphData[i].city.trim());
          this.xAxis[i] = cityLabel.name;
          this.series[i] = parseInt(this.locationGraphData[i].caseCount);
        }
        Highcharts.chart('container', this.options);
      }
    });
  }
  ngOnInit(): void {}

}
