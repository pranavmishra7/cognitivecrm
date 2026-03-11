import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WorkflowTemplateDto } from '../../models/workflow.models';

@Injectable({ providedIn: 'root' })
export class WorkflowApiService {

  private baseUrl = 'https://ceimfconnect-production.up.railway.app/api/workflow';

  constructor(private http: HttpClient) {}

  getTemplates(): Observable<WorkflowTemplateDto[]> {
    return this.http.get<WorkflowTemplateDto[]>(`${this.baseUrl}/templates`);
  }

  getTemplate(id: string) {
    return this.http.get<any>(`${this.baseUrl}/templates/${id}`);
  }

  saveTemplate(payload: any) {
    return this.http.post(`${this.baseUrl}/templates`, payload);
  }

  deleteTemplate(id: string) {
    return this.http.delete(`${this.baseUrl}/templates/${id}`);
  }
}