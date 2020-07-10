export class Data {

    public patientList : [];

    public city = [
        {id: 'C1', name: 'Mapusa'},
        {id: 'C2', name: 'Panjim'},
        {id: 'C3', name: 'Vasco'},
        {id: 'C4', name: 'Ponda'}
      ];

    public month = [
        {id: 'M1', name: "January"},
        {id: 'M2', name: "Febuary"},
        {id: 'M3', name: "March"},
        {id: 'M4', name: "April"},
        {id: 'M5', name: "May"},
        {id: 'M6', name: "June"},
        {id: 'M7', name: "July"},
        {id: 'M8', name: "August"},
        {id: 'M9', name: "September"},
        {id: 'M10', name: "October"},
        {id: 'M11', name: "November"},
        {id: 'M12', name: "December"}
      ];

      public status = [
        
        {id : 1, name: "Mild"},
        {id : 2, name: "Moderate"},
        {id : 3, name: "Critical"},
        {id : 4, name: "Recovered"},
        {id : 5, name: "Deceased"}
      ]

      getAllCities(){
        return this.city;
      }
      getAllMonths(){
        return this.month;
      }
      getAllMonthsNames(){
        let monthNames = [];
        for(let i=0;i<this.month.length;i++){
          monthNames.push(this.month[i].name)
        }
        return monthNames;
      }
      getAllStatus() {
        return this.status;
      }
      
      setIntialValue(patientList){
        this.patientList = patientList
      }
}