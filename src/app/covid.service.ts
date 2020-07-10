import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class CovidService {

  private Rest_Server_API = "https://localhost:44396/"
  constructor(private httpClient : HttpClient) { }

  public getPatientData(){
    return this.httpClient.get(this.Rest_Server_API + "api/patient");
  }

  public getPatient(id : Number){
    return this.httpClient.get(this.Rest_Server_API + "api/patient/" + id);
  }
  /* Hardcorded Values */
  public getLocationGraphData(){
    var locationGraph = [
      {city:'C1',caseCount:'60'},
      {city:'C2',caseCount:'10'},
      {city:'C3',caseCount:'6'},
      {city:'C4',caseCount:'1'},

    ]
    return locationGraph;
  }

  public getAgeGraphData(){
    var ageGraph = [
      {ageGroup:'0-15',caseCount:'2'},
      {ageGroup:'15-30',caseCount:'10'},
      {ageGroup:'30-45',caseCount:'64'},
      {ageGroup:'45-60',caseCount:'1'},
    ]
    return ageGraph;
  }

  public getMonthGraphData(){
    var monthGraph = [
      {month:'M1',caseCount:'60'},
      {month:'M2',caseCount:'10'},
      {month:'M3',caseCount:'6'},
      {month:'M7',caseCount:'6'},
      {month:'M6',caseCount:'6'},
      {month:'M4',caseCount:'1'},
    ]
    return monthGraph;
  }

  public deletePatient(id : Number){
    return this.httpClient.delete(this.Rest_Server_API + "api/patient/" + id);
  }

  public SavePatient(patientModel,status,city,month){   
    const requestData = {
      Name: patientModel.Name,
      Address: patientModel.Address,
      Age: patientModel.Age,
      City: city,
      Status: status,
      Num_Of_Fam: patientModel.Num_Of_Fam,
      Month: month
   };
   console.log(requestData);
    return this.httpClient.post(this.Rest_Server_API + "api/patient/" , requestData);
  }

  public EditPatient(patientModel, id : Number){
    return this.httpClient.put(this.Rest_Server_API + "api/patient/" + id, patientModel);
  }
}
