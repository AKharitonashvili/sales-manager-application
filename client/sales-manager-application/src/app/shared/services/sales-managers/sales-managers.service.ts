import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SalesManager } from '../../models/sales-managers/sales-managers.models';

@Injectable({
  providedIn: 'root',
})
export class SalesManagersService {
  url = 'http://localhost:8000/api/sales-managers';
  constructor(private http: HttpClient) {}

  getSalesManagers(): Observable<SalesManager[]> {
    return this.http.get<SalesManager[]>(this.url);
  }
}
