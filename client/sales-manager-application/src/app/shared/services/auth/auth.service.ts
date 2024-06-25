import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { SalesManager } from '@app/shared/models/sales-managers/sales-managers.models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenSubject: BehaviorSubject<string | null>;
  public token: Observable<string | null>;

  private refreshTokenSubject: BehaviorSubject<string | null>;
  public refreshToken: Observable<string | null>;

  private readonly API_URL = 'http://localhost:8000/api/auth';

  constructor(
    private http: HttpClient,
    private router: Router,
    private jwtHelper: JwtHelperService,
  ) {
    this.tokenSubject = new BehaviorSubject<string | null>(
      localStorage.getItem('token'),
    );
    this.token = this.tokenSubject.asObservable();

    this.refreshTokenSubject = new BehaviorSubject<string | null>(
      localStorage.getItem('refreshToken'),
    );
    this.refreshToken = this.refreshTokenSubject.asObservable();
  }

  public get tokenValue(): string | null {
    return this.tokenSubject.value;
  }

  public get refreshTokenValue(): string | null {
    return this.refreshTokenSubject.value;
  }

  login({ username, password }: { username: string; password: string }) {
    return this.http
      .post<any>(`${this.API_URL}/login`, { username, password })
      .pipe(
        tap((tokens) => {
          localStorage.setItem('token', tokens.token);
          localStorage.setItem('refreshToken', tokens.refreshToken);
          this.tokenSubject.next(tokens.token);
          this.refreshTokenSubject.next(tokens.refreshToken);
        }),
      );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    this.tokenSubject.next(null);
    this.refreshTokenSubject.next(null);
    this.router.navigate(['/login']);
  }

  refreshTokenRequest() {
    return this.http
      .post<any>(`${this.API_URL}/token`, { token: this.refreshTokenValue })
      .pipe(
        tap((tokens) => {
          localStorage.setItem('token', tokens.token);
          this.tokenSubject.next(tokens.token);
        }),
      );
  }

  isAuthenticated(): boolean {
    const token = this.tokenValue;
    return token != null && !this.jwtHelper.isTokenExpired(token);
  }

  addSalesManager(manager: SalesManager): Observable<SalesManager[]> {
    return this.http.post<SalesManager[]>(`${this.API_URL}/register`, manager);
  }

  userInfo(token: string): Observable<{ managerID: string }> {
    return this.http.post<{ managerID: string }>(`${this.API_URL}/user-info`, {
      token,
    });
  }
}
