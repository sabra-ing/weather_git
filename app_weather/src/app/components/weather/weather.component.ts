import { Component } from '@angular/core';
import { WeatherService } from '../../data/services/weather.service';
import { WeatherData } from 'src/app/models/weather.model'; 

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

  isOpen = false;

  selectedGovernorate = '';
  selectedDate = new Date();
  weatherData: WeatherData | null = null;
  loading = false;
  errorMessage = 'ready for weather data';

  constructor(private weatherService: WeatherService) {}
    toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  selectGovernorate(gov: string) {
    this.selectedGovernorate = gov;
    this.isOpen = false;
  }
  fetchWeather() {
    if (!this.selectedGovernorate || !this.selectedDate) return;

    this.loading = true;
    this.errorMessage = '';
    this.weatherData = null;
     // Convert string to Date object:
   const dateObj = new Date(this.selectedDate);
  const formattedDate = dateObj.toISOString().split('T')[0];
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