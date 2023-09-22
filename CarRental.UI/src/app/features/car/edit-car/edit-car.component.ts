import { Component, OnDestroy, OnInit } from '@angular/core';
import { EditCar } from '../models/edit-car.model';
import { ToastrService } from 'ngx-toastr';
import { CarService } from '../services/car.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-car',
  templateUrl: './edit-car.component.html',
  styleUrls: ['./edit-car.component.css']
})
export class EditCarComponent implements OnInit, OnDestroy {
  model: EditCar;

  vehicleId: string | null = null;
  routeSubscription?: Subscription;
  updateCarSubscription?: Subscription
  getCarSubscription?: Subscription
  deleteCarSubscription?: Subscription

  constructor(private route: ActivatedRoute, private toastr: ToastrService, private carService: CarService,private router:Router) {
    this.model = {
      vehicleId: '',
      maker: '',
      model: '',
      features: '',
      isAvailable: true,
      pricePerHour: 200,
      agreements: []
    }
  }

  ngOnInit(): void {
    this.routeSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.vehicleId = params.get('vehicleId');
      }
    })

    if (this.vehicleId) {
      this.getCarSubscription = this.carService.getCarById(this.vehicleId).subscribe({
        next: (response) => {
          this.model={
            vehicleId: response.vehicleId,
            maker: response.maker,
            model: response.model,
            features: response.features,
            isAvailable: response.isAvailable,
            pricePerHour: response.pricePerHour,
            agreements: response.agreements
          } 
        }
      })
    }
  }

  onFormSubmit() {
    if(this.vehicleId){
      this.updateCarSubscription = this.carService.editCar(this.vehicleId,this.model).subscribe({
        next:(response)=>{
          this.toastr.success('Car successfully edited');
          this.router.navigateByUrl('/admin/cars');
        },
        error:(response)=>{
          this.toastr.warning('Car not found');
        }
      })
    }
  }

  deleteCar(){
    if(this.vehicleId){
    this.carService.deleteCar(this.vehicleId).subscribe({
      next : (response)=>{
        this.toastr.success('Car successfully deleted');
        this.router.navigateByUrl('/admin/cars');
      },
      error:(response)=>{
        this.toastr.success('Car Not Found');
    }
    })
    }
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
    this.updateCarSubscription?.unsubscribe();
    this.getCarSubscription?.unsubscribe();
    this.deleteCarSubscription?.unsubscribe();
  }
}
