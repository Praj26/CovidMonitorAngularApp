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

  public getLocationGraphData(){
    return this.httpClient.get(this.Rest_Server_API + "api/locationgraph") 
  }

  public getAgeGraphData(){
    var ageGraph = [
      {ageGroup:'0-15',caseCount:'2'},
      {ageGroup:'15-30',caseCount:'10'},
      {ageGroup:'30-45',caseCount:'64'},
      {ageGroup:'45-60',caseCount:'1'},
    ]
   // return ageGraph
    return this.httpClient.get(this.Rest_Server_API + "api/agegraph")  
  }

  public getMonthGraphData(){
    return this.httpClient.get(this.Rest_Server_API + "api/monthgraph")  
  }

  public deletePatient(id : Number){
    return this.httpClient.delete(this.Rest_Server_API + "api/patient/" + id);
  }

  public SavePatient(patientModel : any,month : string){   
    const requestData = {
      Name: patientModel.name,
      Address: patientModel.address,
      Age: patientModel.age,
      City: patientModel.city,
      Status: patientModel.status,
      Num_Of_Fam: patientModel.num_of_fam,
      Month: month
   };
    return this.httpClient.post(this.Rest_Server_API + "api/patient/" , requestData);
  }

  public EditPatient(patientModel, id : Number,month){
    const requestData = {
      Name: patientModel.name,
      Address: patientModel.address,
      Age: patientModel.age,
      City: patientModel.city,
      Status: patientModel.status,
      Num_Of_Fam: patientModel.num_of_fam,
      Month: month
    };
    console.log(requestData)
    return this.httpClient.put(this.Rest_Server_API + "api/patient/" + id, requestData);
  }
}
