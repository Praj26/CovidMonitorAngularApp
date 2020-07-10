import { Component, OnInit } from '@angular/core';
import { CovidService } from '../covid.service'
import { Data } from '../data';
import { ActivatedRoute } from '@angular/router'



@Component({
  selector: 'app-edit-case',
  templateUrl: './edit-case.component.html',
  styleUrls: ['./edit-case.component.css']
})
export class EditCaseComponent implements OnInit {

  public patientModel = [];
  public data = new Data();
  public cities;
  public status;
  public isValidate = true;
  private id;

  constructor(public covidService: CovidService, private route: ActivatedRoute) {
    this.cities = this.data.getAllCities();
    this.status = this.data.getAllStatus();
  }

  ngOnInit(): void {
      this.id= parseInt(this.route.snapshot.paramMap.get("id"));
      this.covidService.getPatient(this.id).subscribe((data: any[])=>{
        this.patientModel = data[0];
      })
  }
  submit(){
    if(this.isValidate){
        this.covidService.EditPatient(this.patientModel,this.id).subscribe((data: any[])=>{
      })
    }
  }

}
