import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { AuthResponse } from '../models/auth-response';
import { BROWSER_STORAGE } from '../storage';

@Injectable({
  providedIn: 'root'
})
export class TripDataService {

  constructor(
    private http: HttpClient,
    @Inject(BROWSER_STORAGE) private storage: Storage
  ) {}

  baseUrl = 'http://localhost:3000/api';

  // Auth methods
  login(user: User, passwd: string): Observable<AuthResponse> {
    return this.handleAuthAPICall('login', user, passwd);
  }

  register(user: User, passwd: string): Observable<AuthResponse> {
    return this.handleAuthAPICall('register', user, passwd);
  }

  private handleAuthAPICall(endpoint: string, user: User, passwd: string): Observable<AuthResponse> {
    const formData = {
      name: user.name,
      email: user.email,
      password: passwd
    };
    return this.http.post<AuthResponse>(`${this.baseUrl}/${endpoint}`, formData);
  }

  getTrips(): Observable<any> {
    return this.http.get(`${this.baseUrl}/trips`);
  }

  getTrip(tripCode: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/trips/${tripCode}`);
  }

  addTrip(trip: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/trips`, trip);
  }

  updateTrip(trip: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/trips/${trip.code}`, trip);
  }
}
