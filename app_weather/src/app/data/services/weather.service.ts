import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WeatherData } from 'src/app/models/weather.model'; 

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private baseUrl = 'http://127.0.0.1:8000/api/weather'; 

  constructor(private http: HttpClient) {}
  getWeather(governorate: string, date: string): Observable<WeatherData> {
    return this.http.get<WeatherData>('${this.baseUrl}?governorate=${governorate}&date=${date}');
}
}