import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { ImportFieldsRequest, ImfResponse, FormDto } from '../../models/FieldConfig';
import { PostalCode } from '../../models/PostalCode';
import { FormDataValue } from '../../models/FormDataValue';
import { FormDataValueReadResponseDto } from '../../models/FormDataValueReadResponseDto ';
import {PaginatedResult} from '../../models/PaginatedResult';
import { TransactionGridDto } from '../../models/TransactionGridDto';

@Injectable({ providedIn: 'root' })
export class FormApiService {
  private formbase = 'https://ceimfconnect-production.up.railway.app/api/forms';
  private masterbase = 'https://ceimfconnect-production.up.railway.app/api/MasterData'
   private formValuebase = 'https://ceimfconnect-production.up.railway.app/api/formDataValues'

  constructor(private http: HttpClient) { }

  importForm(payload: ImportFieldsRequest): Observable<ImfResponse<FormDto>> {
    
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
  getByFormPaged(
    formId: string,
    clientId?: string,
    page: number = 1,
    pageSize: number = 25,
    ascending: boolean = true
  ): Observable<PaginatedResult<TransactionGridDto>> {
    const url = `${this.formValuebase}/${encodeURIComponent(formId)}`;

    let params = new HttpParams()
      .set('page', String(page))
      .set('pageSize', String(pageSize))
      .set('ascending', String(ascending));

    if (clientId) {
      params = params.set('clientId', clientId);
    }

    return this.http.get<PaginatedResult<TransactionGridDto>>(url, { params })
      .pipe(
        catchError(err => {
          // optionally handle some errors here or rethrow
          console.error('FormDataService.getByFormPaged error', err);
          return throwError(() => err);
        })
      );
  }
}
