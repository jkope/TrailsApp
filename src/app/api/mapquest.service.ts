import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapquestService {
  private baseUrl = 'http://open.mapquestapi.com/';
  private apiKey = 'GQiDNhpklZAwUnLnTFBjUdJwJILRfml4';

  constructor(private http: HttpClient) { }

  getLatLonByZip(zip): Observable<any> {
    return this.http.get(`${this.baseUrl}geocoding/v1/address?key=${this.apiKey}&location=${zip}`);
  }

}
