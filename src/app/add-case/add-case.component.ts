import { Component, OnInit } from '@angular/core';
import { Data } from '../data';
import { Patient } from '../patient';
import { CovidService } from '../covid.service'
import { Router } from '@angular/router'
import { ValuesService } from '../values.service';

@Component({
  selector: 'app-add-case',
  templateUrl: './add-case.component.html',
  styleUrls: ['./add-case.component.css']
})
export class AddCaseComponent implements OnInit {

  cities = [];
  status= [];
  months = [];
  public patientModel = new Patient("","",null,"C1",null,1,"");
  public isFormValid : boolean = true;
  public isNameValid : boolean = true;
  public isAddressValid : boolean = true;
  public isAgeValid : boolean = true;
  public isNum_of_famValid : boolean = true;
  
  public data = new Data()
  constructor(public covidService : CovidService,
              public router : Router, 
              public valuesService : ValuesService
              ) { }
  ngOnInit(): void {
    this.cities = this.data.getAllCities();
    this.status = this.data.getAllStatus();
    this.months = this.data.getAllMonths();
  }
  private validateForm(){
    console.log(this.patientModel.age)
    if(this.patientModel.name == "" || this.patientModel.name == undefined)
      this.isNameValid = false;
    else
      this.isNameValid = true;
    if(this.patientModel.address == "" || this.patientModel.address == undefined)
      this.isAddressValid = false;
    else
      this.isAddressValid = true;
    if(this.patientModel.age == null || this.patientModel.age == undefined)
      this.isAgeValid = false;
    else
      this.isAgeValid = true;
    if(this.patientModel.num_of_fam == null || this.patientModel.num_of_fam == undefined)
      this.isNum_of_famValid = false;
    else
      this.isNum_of_famValid = true;
    if(this.isNameValid && this.isAddressValid && this.isAgeValid && this.isNum_of_famValid)
      this.isFormValid = true;
    else
        this.isFormValid = false;
    return this.isFormValid;
  }
  submit(){
    if(this.validateForm()){
      var date = new Date();
      var mon = date.toLocaleString('default', { month : 'long'})
      let month = this.months.find(x => x.name === mon);
      this.covidService.SavePatient(this.patientModel,month.id).subscribe((data: any[])=>{
        this.valuesService.updataTotalCaseNumberInfo();
        this.router.navigate(['edit']);  
      })
    }
  }
}
