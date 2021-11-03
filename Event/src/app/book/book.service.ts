import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }
  bookURL= "http://localhost:3000/bookings";
  venuesURL= "http://localhost:3000/events"

  // TO BE IMPLEMENTED 
  bookEvent(customerObj: unknown): Observable<any> {
    // 1. It should send a POST request to the URL http://localhost:3000/bookings/
    // by passing customerObj as request body
    // 2. The API call returns an Observable as a reponse, and the same value should be returned from the function
    return this.http.post<any>(this.bookURL, customerObj);
  }

  // Implemented - No Changes Required 
  getLocations(eventId: string): Observable<any> {
    return this.http.get<any>(`${this.venuesURL}/${eventId}`);
  }
}
