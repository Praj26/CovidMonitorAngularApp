import { Injectable, EventEmitter } from '@angular/core';
import { CovidService } from './covid.service';

@Injectable({
  providedIn: 'root'
})
export class ValuesService {

  emit_number_data = new EventEmitter<any>();
  patientList: any[];
  public total_number_cases: number;
  public total_number_deceased: number;
  public total_number_recovered: number;
  public total_number_active: number;

  constructor(public covidService : CovidService) {}

  updataTotalCaseNumberInfo() {
    this.covidService.getPatientData().subscribe((data: any[])=>{
      this.patientList = data;
      this.total_number_cases = 0;
      this.total_number_deceased = 0;
      this.total_number_recovered = 0;
      this.total_number_active = 0;
      this.total_number_cases = this.patientList.length;
      for(let index=0;index<this.patientList.length;index++){
        if(this.patientList[index].Status == 5)
          this.total_number_deceased++;
        if(this.patientList[index].Status == 4)
           this.total_number_recovered++;
      }
      this.total_number_active = this.total_number_cases - (this.total_number_deceased + this.total_number_recovered)
      this.emit_number_data.emit();
    });
  }
  
}
