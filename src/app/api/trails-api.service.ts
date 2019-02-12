import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TrailsApiService {
  private baseUrl = 'https://www.hikingproject.com/data/';
  private apiKey = '200419205-0d57d5f43f801613f59725b2df936b6e';


  constructor(private http: HttpClient) { }

  getTrails(lat, lon, distance?): Observable<any> {
    return this.http.get(`${this.baseUrl}get-trails?lat=${lat}&lon=${lon}&maxDistance=${distance}&key=${this.apiKey}`);
  }

  getTrailsById(ids: Array<number>): Observable<any> {
    const idsString = ids.join();
    return this.http.get(`${this.baseUrl}get-trails-by-id?ids=${idsString}&key=${this.apiKey}`);
  }

  getConditions(ids: Array<number>): Observable<any> {
    const idsString = ids.join();
    return this.http.get(`${this.baseUrl}get-conditions?ids=${idsString}&key=${this.apiKey}`);
  }

}
