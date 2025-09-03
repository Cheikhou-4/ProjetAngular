import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class MeteoService {
  private apiKey = 'ee2aba0cfbc87cbd888a2491c1a3afca';
  private apiUrl = 'https://api.openweathermap.org/data/2.5';

  constructor(private http: HttpClient) {}

  getMeteoByCity(city: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/weather?q=${city}&units=metric&lang=fr&appid=${this.apiKey}`)
      .pipe(catchError(this.handleError));
  }

  getMeteoByCoords(lat: number, lon: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/weather?lat=${lat}&lon=${lon}&units=metric&lang=fr&appid=${this.apiKey}`)
      .pipe(catchError(this.handleError));
  }

  getForecastByCity(city: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/forecast?q=${city}&units=metric&lang=fr&appid=${this.apiKey}`)
      .pipe(catchError(this.handleError));
  }

  getForecastByCoords(lat: number, lon: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/forecast?lat=${lat}&lon=${lon}&units=metric&lang=fr&appid=${this.apiKey}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    return throwError(() => new Error(error.message || 'Erreur météo'));
  }
}