import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ImportFieldsRequest, ImfResponse, FormDto } from '../../models/FieldConfig';
import { PostalCode } from '../../models/PostalCode';
import { FormDataValue } from '../../models/FormDataValue';

@Injectable({ providedIn: 'root' })
export class FormApiService {
  private formbase = 'https://localhost:7003/api/forms';
  private masterbase = 'https://localhost:7003/api/MasterData'
   private formValuebase = 'https://localhost:7003/api/formDataValues'

  constructor(private http: HttpClient) { }

  importForm(payload: ImportFieldsRequest): Observable<ImfResponse<FormDto>> {
    debugger;
    return this.http.post<ImfResponse<FormDto>>(`${this.formbase}/import`, payload);
  }

  getForm(clientId: string, formName: string): Observable<ImfResponse<FormDto>> {
    return this.http.get<ImfResponse<FormDto>>(`${this.formbase}/${clientId}/${encodeURIComponent(formName)}`);
  }

  get(clientId: string): Observable<ImfResponse<FormDto[]>> {
    return this.http.get<ImfResponse<FormDto[]>>(`${this.formbase}/${clientId}`);
  }

  getState(state: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.masterbase}/${state}`);
  }

  getDistrict(state: string, dist: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.masterbase}/${state}/${dist}`);
  }
    getByPostalCode(code: number): Observable<PostalCode[]> {
    return this.http.get<PostalCode[]>(`${this.masterbase}/${code}`);
  }
      submitFormData(formData: FormDataValue[]): Observable<ImfResponse<FormDataValue>> {
    return this.http.post<ImfResponse<FormDataValue>>(`${this.formValuebase}/submitt`, formData);
  }
}
