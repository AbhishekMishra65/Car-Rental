import { Component, OnInit } from '@angular/core';
import { CarService } from '../services/car.service';
import { Car } from '../models/car.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-getallcars-admin',
  templateUrl: './getallcars-admin.component.html',
  styleUrls: ['./getallcars-admin.component.css']
})
export class GetallcarsAdminComponent implements OnInit {
  cars$?:Observable<Car[]>;

constructor(private carService: CarService){

}
  ngOnInit(): void {
    this.cars$ = this.carService.getAllCar();
  }
}
