import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { CreateCarRequest } from '../models/createcar-request.model';
import { Car } from '../models/car.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private http: HttpClient) { }

  createCar(data:CreateCarRequest):Observable<Car>{
    return this.http.post<Car>(`${environment.apiBaseUrl}/api/car?addAuth=true`,data);
  }

  getAllCar():Observable<Car[]>{
    return this.http.get<Car[]>(`${environment.apiBaseUrl}/api/car/GetAllCar?addAuth=true`);
  }

  getAvailableCar():Observable<Car[]>{
    return this.http.get<Car[]>(`${environment.apiBaseUrl}/api/car/AvailableCar`);
  }

  getCarById(VehicleId:string):Observable<Car>{
    return this.http.get<Car>(`${environment.apiBaseUrl}/api/car/GetCar/${VehicleId}`);
  }
}
