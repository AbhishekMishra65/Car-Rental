import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { ExpectedRentRequest } from '../models/calculate-rent.model';
import { CreateAgreementRequest } from '../models/createagreement-requestt.model';
import { Agreement } from '../models/agreement.model';

@Injectable({
  providedIn: 'root'
})
export class AgreementService {

  constructor(private http: HttpClient) { }

  calucalteRent(data:ExpectedRentRequest):Observable<number>{
    return this.http.post<number>(`${environment.apiBaseUrl}/api/rentalagreement/RentPrice`,data);
  }

  createAgreement(data:CreateAgreementRequest):Observable<Agreement>{
    return this.http.post<Agreement>(`${environment.apiBaseUrl}/api/rentalagreement?addAuth=true`,data);
  }

  userAgreements(email:number):Observable<Agreement[]>{
    return this.http.get<Agreement[]>(`${environment.apiBaseUrl}/api/rentalagreement/user/${email}?addAuth=true`);
  }

  updateReturnRequest(agreementId:string,existingAgreement:Agreement):Observable<Agreement>{
    return this.http.put<Agreement>(`${environment.apiBaseUrl}/api/rentalagreement/${agreementId}?addAuth=true`,existingAgreement);
  }

}
