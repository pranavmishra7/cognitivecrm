import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthRequest, AuthResponse, ImfResponse } from '../../models/auth.models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = 'https://localhost:7003/api/Auth';
  
  private tokenSubject = new BehaviorSubject<string | null>(null);
  private clientIdSubject = new BehaviorSubject<string | null>(null);
  private expirySubject = new BehaviorSubject<Date | null>(null);
  private userNameSubject = new BehaviorSubject<string | null>(null);
  private userTypeSubject = new BehaviorSubject<string | null>(null);

  userType$ = this.userTypeSubject.asObservable();
  token$ = this.tokenSubject.asObservable();
  clientId$ = this.clientIdSubject.asObservable();
  expiry$ = this.expirySubject.asObservable();
  userName$ = this.userNameSubject.asObservable();

  constructor(private http: HttpClient) {
    // restore session if stored
    const token = localStorage.getItem('token');
    const clientId = localStorage.getItem('clientId');
    const expiry = localStorage.getItem('expiry');
    const userName = localStorage.getItem('userName');
    const userType = localStorage.getItem('userType');
    if (userType) {
      this.userTypeSubject.next(userType);
    }
    if (userName) {
      this.userNameSubject.next(userName);
    }
    if (token && clientId && expiry) {
      this.tokenSubject.next(token);
      this.clientIdSubject.next(clientId);
      this.expirySubject.next(new Date(expiry));
    }
  }

  login(request: AuthRequest): Observable<ImfResponse<AuthResponse>> {
    return this.http.post<ImfResponse<AuthResponse>>(`${this.baseUrl}/login`, request).pipe(
      tap((res) => {
        if (res.success) {
          this.setSession(res.data);
        }
      })
    );
  }

  private setSession(auth: AuthResponse) {
    this.tokenSubject.next(auth.token);
    this.clientIdSubject.next(auth.clientId);
    this.expirySubject.next(new Date(auth.expiry));
    this.userNameSubject.next(auth.userName);
    this.userTypeSubject.next(auth.userType);

    localStorage.setItem('userName', auth.userName);
    localStorage.setItem('userType', auth.userType);
    localStorage.setItem('token', auth.token);
    localStorage.setItem('clientId', auth.clientId);
    localStorage.setItem('expiry', auth.expiry);
  }

  logout() {
    this.tokenSubject.next(null);
    this.clientIdSubject.next(null);
    this.expirySubject.next(null);
    this.userNameSubject.next(null);
    this.userTypeSubject.next(null);
    localStorage.removeItem('userName');
    localStorage.removeItem('userType');
    localStorage.removeItem('token');
    localStorage.removeItem('clientId');
    localStorage.removeItem('expiry');
  }

  getToken(): string | null {
    return this.tokenSubject.value;
  }

  getClientId(): string | null {
    return this.clientIdSubject.value;
  }
  getUserName(): string | null {
    return this.userNameSubject.value;
  }
}
