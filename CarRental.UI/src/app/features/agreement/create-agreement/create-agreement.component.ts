import { Component, OnDestroy, OnInit, numberAttribute } from '@angular/core';
import { Car } from '../../car/models/car.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService } from '../../car/services/car.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ExpectedRentRequest } from '../models/calculate-rent.model';
import { AgreementService } from '../services/agreement.service';
import { CreateAgreementRequest } from '../models/createagreement-requestt.model';

@Component({
  selector: 'app-create-agreement',
  templateUrl: './create-agreement.component.html',
  styleUrls: ['./create-agreement.component.css']
})
export class CreateAgreementComponent implements OnInit, OnDestroy {
  model?: Car;
  vehicleId: string | null = null;
  routeSubscription?: Subscription;
  createAgreementSubscription?: Subscription;
  getCarSubscription?: Subscription;
  calculateRentSubscription?: Subscription;
  fromDate: Date = new Date();
  toDate: Date = new Date();
  expectedRentModel: ExpectedRentRequest;
  expectedRent: number | null = null;
  isAccept: boolean = false;
  createAgreementModel: CreateAgreementRequest;
  currentDate: Date = new Date();

  constructor(private route: ActivatedRoute, private carService: CarService, private router: Router, private toastr: ToastrService, private agreementService: AgreementService) {

    this.expectedRentModel = {
      fromDate: new Date(),
      toDate: new Date(),
      pricePerHour: 0
    };

    this.createAgreementModel = {
      email: '',
      carVehicleId: '',
      fromDate: new Date(),
      toDate: new Date(),
      //totalPrice: 0
    }

  }

  ngOnInit(): void {
    this.routeSubscription = this.route.paramMap.subscribe({
      //Getting the id passed to this component using params
      next: (params) => {
        this.vehicleId = params.get('VehicleId');
      }
    })

    if (this.vehicleId) {
      this.getCarSubscription = this.carService.getCarById(this.vehicleId).subscribe({
        next: (response) => {
          this.model = response;
        }
      })
    }
  }

  rentprice() {
    if (this.fromDate >= this.currentDate) {
      if (this.model) {
        this.expectedRentModel.pricePerHour = this.model.pricePerHour;
        this.expectedRentModel.fromDate = this.fromDate;
        this.expectedRentModel.toDate = this.toDate;

        this.calculateRentSubscription = this.agreementService.calucalteRent(this.expectedRentModel).subscribe({
          next: (response) => {
            this.expectedRent = response;
          }
        })
      }
    }
    else {
      this.toastr.warning('please select correct date')
    }
  }

  onFormSubmit() {
    const email = localStorage.getItem('user-email')
    if (this.fromDate < this.toDate && this.isAccept) {
      if (email && this.vehicleId) {
        this.createAgreementModel.email = email;
        this.createAgreementModel.carVehicleId = this.vehicleId
        this.createAgreementModel.fromDate = this.fromDate
        this.createAgreementModel.toDate = this.toDate
        // this.createAgreementModel.totalPrice= this.expectedRent

        this.createAgreementSubscription = this.agreementService.createAgreement(this.createAgreementModel).subscribe({
          next: (response) => {
            this.toastr.success('Agreement created successfully');
            this.router.navigateByUrl('/');
          }
        })
      }
      else {
        this.toastr.warning('Login neccessary');
      }
    }
    else {
      this.toastr.warning('Not correct dates');
    }
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
    this.calculateRentSubscription?.unsubscribe();
    this.getCarSubscription?.unsubscribe();
    this.createAgreementSubscription?.unsubscribe();
  }
}
