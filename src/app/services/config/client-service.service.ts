import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ImfResponse } from '../../models/FieldConfig';
import { ClientDto } from '../../models/clientDto';

@Injectable({ providedIn: 'root' })
export class ClientService {
  private base = 'https://localhost:7003/api/Clients'; 

  constructor(private http: HttpClient) {}

  getAll(): Observable<ImfResponse<ClientDto[]>> {
    return this.http.get<ImfResponse<ClientDto[]>>(this.base);
  }

  get(id: string): Observable<ImfResponse<ClientDto>> {
    return this.http.get<ImfResponse<ClientDto>>(`${this.base}/${id}`);
  }

  create(dto: ClientDto): Observable<ImfResponse<ClientDto>> {
    return this.http.post<ImfResponse<ClientDto>>(this.base, dto);
  }

  update(dto: ClientDto): Observable<ImfResponse<ClientDto>> {
    return this.http.put<ImfResponse<ClientDto>>(`${this.base}/${dto.clientId}`, dto);
  }

  delete(id: string): Observable<ImfResponse<string>> {
    return this.http.delete<ImfResponse<string>>(`${this.base}/${id}`);
  }
}
