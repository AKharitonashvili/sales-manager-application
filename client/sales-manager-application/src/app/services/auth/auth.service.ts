import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { SalesManager } from 'src/app/models/sales-managers/sales-managers.models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url = 'http://localhost:8000/api/auth';
  constructor(private http: HttpClient) {}

  addSalesManager(manager: SalesManager): Observable<SalesManager[]> {
    return this.http.post<SalesManager[]>(`${this.url}/register`, manager);
  }

  login(user: { username: string; password: string }): Observable<{
    token: string;
    refreshToken: string;
  }> {
    return this.http
      .post<{
        token: string;
        refreshToken: string;
      }>(`${this.url}/login`, user)
      .pipe(
        tap(({ token, refreshToken }) => {
          localStorage.setItem('accessToken', token);
          localStorage.setItem('refreshToken', refreshToken);
        }),
      );
  }

  refreshAccessToken(refreshToken: string): Observable<{
    token: string;
    refreshToken: string;
  }> {
    return this.http
      .post<{
        token: string;
        refreshToken: string;
      }>('/refresh', { refreshToken })
      .pipe(
        tap((response) => {
          if (response && response.token) {
            localStorage.setItem('accessToken', response.token);
          }
        }),
      );
  }
}
