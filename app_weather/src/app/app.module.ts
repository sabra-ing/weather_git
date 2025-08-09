import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WeatherComponent } from './components/weather/weather.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NbSpinnerModule, NbAlertModule, NbIconModule, NbCardModule, NbLayoutModule, NbOptionModule, NbSelectModule, NbButtonModule , NbDatepickerModule, NbThemeModule , NbContextMenuModule} from '@nebular/theme';

@NgModule({
  declarations: [
    AppComponent,
    WeatherComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NbSpinnerModule,
    NbAlertModule,
    NbIconModule,
    NbCardModule,
    NbLayoutModule,
    NbOptionModule,
    NbSelectModule, 
    NbButtonModule,
    NbContextMenuModule ,
    NbDatepickerModule.forRoot(),
    NbThemeModule.forRoot({name:'default'})
   ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }