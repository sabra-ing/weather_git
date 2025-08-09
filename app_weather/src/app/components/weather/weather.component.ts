import { Component } from '@angular/core';
import { WeatherService } from '../../data/services/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent {
  governorates = [
    'Tunis', 'Ariana', 'Ben Arous', 'Manouba', 'Nabeul', 'Bizerte',
    'Zaghouan', 'Beja', 'Jendouba', 'Kef', 'Siliana', 'Kairouan',
    'Kasserine', 'Sidi Bouzid', 'Sousse', 'Monastir', 'Mahdia',
    'Gabes', 'Mednine', 'Tataouine', 'Gafsa', 'Tozeur', 'Kebili'
  ];



  selectedGovernorate = '';
  selectedDate = new Date();
  weatherData: any = null;
  loading = false;
  errorMessage = 'ready for weather data';

  constructor(private weatherService: WeatherService) {}

  fetchWeather() {
    if (!this.selectedGovernorate || !this.selectedDate) return;

    this.loading = true;
    this.errorMessage = '';
    this.weatherData = null;

    const formattedDate = this.selectedDate.toISOString().split('T')[0];

    this.weatherService.getWeather(this.selectedGovernorate, formattedDate).subscribe({
      next: (data) => {
        this.weatherData = data;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to fetch weather data. Please try again.';
        this.loading = false;
      }
    });
  }

}