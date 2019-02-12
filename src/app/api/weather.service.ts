import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private baseUrl = 'http://api.openweathermap.org/data/';
  private apiKey = 'c0de53d248bc96d3902315ac740874ee';
  constructor(private http: HttpClient) { }

  getWeatherByCoordinates(lat, lon): Observable<any> {
  return this.http.get(`${this.baseUrl}2.5/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}`);
  }

  getForecastByCoordinates(lat, lon): Observable<any> {
    return this.http.get(`${this.baseUrl}2.5/forecast?lat=${lat}&lon=${lon}&appid=${this.apiKey}`);
  }

}
