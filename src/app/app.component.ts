import { Component, Output, Input, EventEmitter } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ValuesService } from './values.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CovidMonitor';
  public total_number_cases = 0;
  public total_number_active = 0;
  public total_number_deceased = 0;
  public total_number_recovered = 0;
  
  constructor(public valuesService: ValuesService) 
  {  
    this.valuesService.emit_number_data.subscribe(
      () => {
        this.total_number_cases = this.valuesService.total_number_cases;
        this.total_number_active = this.valuesService.total_number_active;
        this.total_number_deceased = this.valuesService.total_number_deceased;
        this.total_number_recovered = this.valuesService.total_number_recovered;
      })
  }
  ngOnInit(){
    this.valuesService.updataTotalCaseNumberInfo();
  }  
}
