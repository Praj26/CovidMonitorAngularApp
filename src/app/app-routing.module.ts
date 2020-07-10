import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddCaseComponent } from './add-case/add-case.component';
import { EditCaseComponent } from './edit-case/edit-case.component';
import { AgeDisplayComponent } from './age-display/age-display.component';
import { MonthDisplayComponent } from './month-display/month-display.component';
import { PatientDisplayComponent } from './patient-display/patient-display.component';
import { LocationDisplayComponent } from './location-display/location-display.component';


const routes: Routes = [
  {path: '', component: AgeDisplayComponent},
  {path: 'month', component: MonthDisplayComponent},
  {path: 'age', component: AgeDisplayComponent},
  {path: 'location', component: LocationDisplayComponent},
  {path: 'add', component: AddCaseComponent},
  {path: 'edit', component: PatientDisplayComponent},
  {path: 'edit/:id', component: EditCaseComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
