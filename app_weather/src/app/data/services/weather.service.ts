import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WeatherData } from 'src/app/models/weather.model'; 

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private baseUrl = 'http://127.0.0.1:8000/api/weather/';  // Added trailing slash

  constructor(private http: HttpClient) {}

  getWeather(governorate: string, date: string): Observable<WeatherData> {
    const params = { governorate, date };
    return this.http.get<WeatherData>(this.baseUrl, { params });
  }
}
