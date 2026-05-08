import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private baseUrl = 'http://localhost:8080/api/admin';

  constructor(private http: HttpClient) {}

  // Dashboard Stats
  getDashboardStats(): Observable<any> {
    return this.http.get(`${this.baseUrl}/dashboard/stats`);
  }

  // User Management
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/users`);
  }

  updateUserStatus(id: number, status: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/users/${id}/status?status=${status}`, {});
  }

  saveUser(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/users`, user);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/users/${id}`);
  }

  // Plan Management
  getPlans(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/plans`);
  }

  savePlan(plan: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/plans`, plan);
  }

  deletePlan(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/plans/${id}`);
  }

  // Booking Management
  getBookings(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/bookings`);
  }

  updateBookingStatus(id: number, status: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/bookings/${id}/status?status=${status}`, {});
  }

  // Growth Reports
  getGrowthReport(): Observable<any> {
    return this.http.get(`${this.baseUrl}/reports/growth`);
  }

  // Profile & Security
  updateProfile(data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/users/profile`, data);
  }

  changePassword(data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/users/password`, data);
  }
}
