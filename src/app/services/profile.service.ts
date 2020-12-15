import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) {}

  public getCountries(): Observable<any> {
    return this.http.get('https://restcountries.eu/rest/v2/all');
  }
}
