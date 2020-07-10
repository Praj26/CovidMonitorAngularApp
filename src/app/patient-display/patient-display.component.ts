import { Component, OnInit } from '@angular/core';
import { CovidService } from '../covid.service'
import { Data } from '../data';
import{ Router } from '@angular/router'
@Component({
  selector: 'app-patient-display',
  templateUrl: './patient-display.component.html',
  styleUrls: ['./patient-display.component.css']
})
export class PatientDisplayComponent implements OnInit {
  
  patientList = [];
  cities = [];
  status= [];
  public data = new Data()
     
  constructor(public covidService: CovidService, public router : Router) {
    this.cities = this.data.getAllCities();
    this.status = this.data.getAllStatus();
   }

  ngOnInit(): void {
    this.covidService.getPatientData().subscribe((data: any[])=>{
       this.patientList = data;
       for(let i=0;i<this.patientList.length;i++){
         let cityLabel = this.cities.find(x => x.id === this.patientList[i].City.trim());
         this.patientList[i].CityLabel=cityLabel.name;
         console.log(this.patientList[i].Status)
         let statusLabel = this.status.find(x => x.id === this.patientList[i].Status);
         this.patientList[i].StatusLabel=statusLabel.name;
       }
    })  
  }

  deleteRecord(recordID:Number){
    this.covidService.deletePatient(recordID).subscribe((data : any[])=>{
      this.router.navigate([' ']);
    })
  }

}
