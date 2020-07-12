import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddCaseComponent } from './add-case/add-case.component';
import { EditCaseComponent } from './edit-case/edit-case.component';
import { AgeDisplayComponent } from './age-display/age-display.component';
import { MonthDisplayComponent } from './month-display/month-display.component';
import { PatientDisplayComponent } from './patient-display/patient-display.component';
import { LocationDisplayComponent } from './location-display/location-display.component';
import { NumberonlyDirective } from './numberonly.directive';

@NgModule({
  declarations: [
    AppComponent,
    AddCaseComponent,
    EditCaseComponent,
    AgeDisplayComponent,
    MonthDisplayComponent,
    PatientDisplayComponent,
    LocationDisplayComponent,
    NumberonlyDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
