import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private apiUrl = 'http://localhost:8080/api/appointments';

  constructor(private http: HttpClient) {}

  // 🔴 IMPORTANT FIX: responseType: 'text'
  bookAppointment(data: any): Observable<string> {
    return this.http.post(
      this.apiUrl,
      data,
      { responseType: 'text' }   
    );
  }
}
