import { Injectable, signal, WritableSignal, inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { CurrentUser } from '../models/current-user.model';
import {
  catchError,
  filter,
  firstValueFrom,
  Observable,
  of,
  take,
  tap,
  throwError,
} from 'rxjs';
import { environment } from '../../environment/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export interface LogoutResponse {
  message: string;
}

export interface AuthResponse {
  jwt: string;
  user: CurrentUser;
}

export interface LoginPayload {
  username: string;
  password: string;
}

const http_header = new HttpHeaders({
  Headers: 'Access-Control-Allow-Origin : http://localhost:4200',
});
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUser: WritableSignal<CurrentUser | null | undefined> =
    signal(undefined);
  user$ = toObservable(this.currentUser);

  http = inject(HttpClient);

  initializeUser(): Promise<unknown> {
    if (localStorage.getItem('accessToken')) {
      return firstValueFrom(this.getCurrentUser());
    }
    return Promise.resolve();
  }

  constructor() {
    this.user$
      .pipe(
        filter(
          (user): user is CurrentUser => user !== null && user !== undefined
        ),
        take(1)
      )
      .subscribe();
  }
  getCurrentUser(): Observable<CurrentUser> {
    return this.http.get<CurrentUser>(`${environment.API_URL}/auth/user`).pipe(
      tap((response) => {
        this.currentUser.set(response);
      }),
      catchError((error) => {
        localStorage.removeItem('accessToken');
        console.error('Failed to load user:', error);
        this.currentUser.set(undefined);
        return throwError(() => error);
      })
    );
  }

  login(formData: LoginPayload): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(
        `${environment.API_URL}/auth/authenticate`,
        formData,
        {
          headers: http_header,
        }
      )
      .pipe(
        tap((response) => {
          this.setAccessToken(response.jwt);
          this.currentUser.set(response.user);
        })
      );
  }

  register(formData: CurrentUser): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${environment.API_URL}/auth/register`, formData)
      .pipe(
        tap((response) => {
          this.setAccessToken(response.jwt);
          this.currentUser.set(response.user);
        })
      );
  }

  logout(): Observable<LogoutResponse> {
    return this.http
      .post<LogoutResponse>(`${environment.API_URL}/auth/logout`, {})
      .pipe(
        tap((_response) => {
          this.currentUser.set(null);
          localStorage.removeItem('accessToken');
          localStorage.removeItem('cartItems');
        }),
        catchError((_err) => {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('cartItems');
          return of();
        })
      );
  }

  setAccessToken(token: string): void {
    localStorage.setItem('accessToken', token);
  }
  setRefreshToken(token: string) {
    localStorage.setItem('refreshToken', token);
  }
}
