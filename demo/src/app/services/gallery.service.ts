import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface GalleryItem {
  id?: number;
  type?: string;
  image?: string;
  title: string;
  description: string;
}

export interface ShowcaseHighlight {
  id?: number;
  beforeImage?: string;
  afterImage?: string;
  title: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class GalleryService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  getAll(type?: string): Observable<GalleryItem[]> {
    let url = `${this.apiUrl}/gallery`;
    if (type) {
      url += `?type=${type}`;
    }
    return this.http.get<GalleryItem[]>(url);
  }

  save(item: GalleryItem): Observable<GalleryItem> {
    return this.http.post<GalleryItem>(`${this.apiUrl}/admin/gallery`, item);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/admin/gallery/${id}`);
  }

  // --- SHOWCASE HIGHLIGHTS ENDPOINTS ---
  getHighlights(): Observable<ShowcaseHighlight[]> {
    return this.http.get<ShowcaseHighlight[]>(`${this.apiUrl}/highlights`);
  }

  saveHighlight(item: ShowcaseHighlight): Observable<ShowcaseHighlight> {
    return this.http.post<ShowcaseHighlight>(`${this.apiUrl}/highlights`, item);
  }

  deleteHighlight(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/highlights/${id}`);
  }
}
