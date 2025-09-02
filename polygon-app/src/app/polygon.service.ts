import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PolygonService {
  private apiKey = "r6r54SkzNjCK2bBi1iQQ2gAom6q1BOmK";
  private baseUrl = "https://api.polygon.io/v3/reference/tickers";

  constructor(private http: HttpClient) {}

  getTickers(limit = 20): Observable<any> {
    return this.http.get(`${this.baseUrl}?market=stocks&active=true&limit=${limit}&apiKey=${this.apiKey}`);
  }
}
