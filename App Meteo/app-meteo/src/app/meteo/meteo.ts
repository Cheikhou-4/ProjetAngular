import { Component } from '@angular/core';
import '../../locale';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MeteoService } from '../services/meteo';
@Component({
  selector: 'app-meteo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './meteo.html',
  styleUrls: ['./meteo.css']
})
export class MeteoComponent {
  city: string = '';
  meteoData: any = null;
  errorMsg: string = '';
  loading: boolean = false;
  history: string[] = [];
  forecastData: any[] = [];

  constructor(private meteoService: MeteoService) {}

  searchMeteo() {
    if (!this.city) {
      this.errorMsg = "Veuillez saisir une ville.";
      this.meteoData = null;
      this.forecastData = [];
      return;
    }
    this.loading = true;
    this.errorMsg = '';
      this.meteoService.getMeteoByCity(this.city).subscribe({
        next: (data: any) => {
          this.meteoData = data;
          this.errorMsg = '';
            this!.loading = false;
          this.addToHistory(this.city);
          this.loadForecastByCity(this.city);
        },
        error: (err: any) => {
          this.errorMsg = err.message;
          this.meteoData = null;
          this.forecastData = [];
    this!.loading = false;
        }
      });
  }

  getLocationMeteo() {
    if (!navigator.geolocation) {
      this.errorMsg = "La géolocalisation n'est pas supportée par votre navigateur.";
      return;
    }
    this.loading = true;
      navigator.geolocation.getCurrentPosition(
        (position: any) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          this.meteoService.getMeteoByCoords(lat, lon).subscribe({
            next: (data: any) => {
              this.meteoData = data;
              this.errorMsg = '';
              this!.loading = false;
              this.loadForecastByCoords(lat, lon);
            },
            error: (err: any) => {
              this.errorMsg = err.message;
              this.meteoData = null;
        this!.loading = false;
              this.forecastData = [];
            }
          });
        },
        (error: any) => {
          this.errorMsg = "Impossible d'obtenir la position.";
          this.forecastData = [];
            this!.loading = false;
        }
      );
  }

  loadForecastByCity(city: string) {
    this.meteoService.getForecastByCity(city).subscribe({
      next: (data: any) => {
        this.forecastData = this.extractDailyForecast(data.list);
      },
      error: (err: any) => {
        this.forecastData = [];
      }
    });
  }

  loadForecastByCoords(lat: number, lon: number) {
    this.meteoService.getForecastByCoords(lat, lon).subscribe({
      next: (data: any) => {
        this.forecastData = this.extractDailyForecast(data.list);
      },
      error: (err: any) => {
        this.forecastData = [];
      }
    });
  }

  extractDailyForecast(list: any[]): any[] {
    const daily: any[] = [];
    const seenDates: Set<string> = new Set();
    for (const item of list) {
      const date = item.dt_txt.split(' ')[0];
      const hour = item.dt_txt.split(' ')[1];
      if (!seenDates.has(date) && hour === '12:00:00') {
        daily.push(item);
        seenDates.add(date);
      }
      if (daily.length >= 5) break;
    }
    return daily;
  }

  addToHistory(city: string) {
    city = city.trim();
    if (!city) return;
    if (!this.history.includes(city)) {
      this.history.unshift(city);
      if (this.history.length > 5) this.history.pop();
    }
  }

  selectHistory(city: string) {
    this.city = city;
    this.searchMeteo();
  }
}
