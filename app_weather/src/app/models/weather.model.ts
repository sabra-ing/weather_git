export interface WeatherData {
  location: string;
  date: string;
  condition: string;
  temperature: {
    min: number;
    max: number;
  };
  humidity: number;
  wind_speed: number;
}
