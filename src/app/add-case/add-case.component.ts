import { Component, OnInit } from '@angular/core';
import { Data } from '../data';
import { CovidService } from '../covid.service'

@Component({
  selector: 'app-add-case',
  templateUrl: './add-case.component.html',
  styleUrls: ['./add-case.component.css']
})
export class AddCaseComponent implements OnInit {

  cities = [];
  status= [];
  months = [];
  selectedStatus = "Mild";
  selectedCity = "Mapusa"
  public patientModel = [
    {Name:""},
    {Address:""},
    {Age: 0},
    {City:""},
    {Num_Of_Fam:0},
    {Status:""},
    {Month:""}
  ];
  public data = new Data()
  constructor(public covidService : CovidService) { }

  ngOnInit(): void {
    this.cities = this.data.getAllCities();
    this.status = this.data.getAllStatus();
    this.months = this.data.getAllMonths();
  }
  selectStatus(id){
    this.selectedStatus = id;
  }
  selectCity(id){
    this.selectCity = id;
  }

  submit(){
    var date = new Date();
    var mon = date.toLocaleString('default', { month : 'long'})
    let month = this.months.find(x => x.name === mon);
    let status = this.status.find(x => x.name === this.selectedStatus.toString());
    let city = this.cities.find(x => x.name === this.selectCity.toString());
    this.covidService.SavePatient(this.patientModel,status.id,city.id,month.id).subscribe((data: any[])=>{
    })
  }
}
