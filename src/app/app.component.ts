import { Component, Output, Input, EventEmitter } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CovidService } from './covid.service'
import { Data } from './data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CovidMonitor';
  private patientList;
  public total_number_cases = 0;
  public total_number_deceased = 0;
  public total_number_recovered = 0;
  public data = new Data()
  
  constructor(public covidService: CovidService) 
  { 
    this.covidService.getPatientData().subscribe((data: any[])=>{
      this.patientList = data;
      this.total_number_cases = this.patientList.length;
      console.log("total_number_cases")
      for(let index=0;index<this.patientList.length;index++){
        if(this.patientList[index].status == 5)
          this.total_number_deceased++;
          if(this.patientList[index].status == 4)
           this.total_number_recovered++;
      }
     
      this.data.setIntialValue(this.patientList);
    }) 
  }

  ngOnInit(){}  
}
