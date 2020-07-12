import { Component, OnInit } from '@angular/core';
import { CovidService } from '../covid.service'
import { Data } from '../data';
import { Patient } from '../patient';
import { ActivatedRoute, Router } from '@angular/router'
import { ValuesService } from '../values.service';

@Component({
  selector: 'app-edit-case',
  templateUrl: './edit-case.component.html',
  styleUrls: ['./edit-case.component.css']
})
export class EditCaseComponent implements OnInit {

  public data = new Data();
  public cities;
  public status;
  private patientId;
  public patientModel = new Patient("","",null,"C1",null,1,"");
  public isFormValid : boolean = true;
  public isNameValid : boolean = true;
  public isAddressValid : boolean = true;
  public isAgeValid : boolean = true;
  public isNum_of_famValid : boolean = true;

  constructor(
    private covidService: CovidService,
    private route: ActivatedRoute, 
    private router: Router,
    private valuesService : ValuesService
    ){
      this.cities = this.data.getAllCities();
      this.status = this.data.getAllStatus();
    }

  ngOnInit(): void {
      this.patientId= parseInt(this.route.snapshot.paramMap.get("id"));
      this.covidService.getPatient(this.patientId).subscribe((data: any[])=>{
        this.patientModel.name = data[0].Name;
        this.patientModel.address = data[0].Address;
        this.patientModel.age = data[0].Age;
        this.patientModel.city = data[0].City.trim();
        this.patientModel.month = data[0].Month;
        this.patientModel.num_of_fam = data[0].Num_Of_Fam;
        this.patientModel.status = data[0].Status;

      })
  }
  private validateForm(){
    if(this.patientModel.name == "" || this.patientModel.name == undefined)
      this.isNameValid = false;
    else
      this.isNameValid = true;

    if(this.patientModel.address == "" || this.patientModel.address == undefined)
      this.isAddressValid = false;
    else
      this.isAddressValid = true;

    if(this.patientModel.age.toString() == "" || this.patientModel.age == undefined)
      this.isAgeValid = false;
    else
      this.isAgeValid = true;

    if(this.patientModel.num_of_fam.toString() == "" || this.patientModel.num_of_fam == undefined)
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
        let month = this.data.getAllMonths().find(x => x.name === mon);
        this.covidService.EditPatient(this.patientModel,this.patientId,month.id).subscribe((data)=>{
          this.valuesService.updataTotalCaseNumberInfo();
          this.router.navigate(['edit']);
        });
    }
  }

}
