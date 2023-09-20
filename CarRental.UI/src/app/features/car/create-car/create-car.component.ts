import { Component } from '@angular/core';
import { CreateCarRequest } from '../models/createcar-request.model';
import { ToastrService } from 'ngx-toastr';
import { CarService } from '../services/car.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-car',
  templateUrl: './create-car.component.html',
  styleUrls: ['./create-car.component.css']
})
export class CreateCarComponent {
  model:CreateCarRequest

  constructor(private toastr: ToastrService,private carService: CarService,private router:Router){
    this.model={
      maker:'',
      model:'',
      features:'',
      isAvailable:true,
      pricePerHour:200,
      agreements:[]
    }
  }

  onFormSubmit(){
    this.carService.createCar(this.model).subscribe({
      next:(response)=>{
        this.router.navigateByUrl('/admin/cars');
        this.toastr.success('Car added successfully');
      }
    })
  }
}
