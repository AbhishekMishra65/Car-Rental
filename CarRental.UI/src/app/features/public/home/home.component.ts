import { Component } from '@angular/core';
import { Car } from '../../car/models/car.model';
import { User } from '../../auth/models/user.model';
import { Observable } from 'rxjs';
import { CarService } from '../../car/services/car.service';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  cars$?: Observable<Car[]>;
  searchtext: string = '';
  page: number = 1;
  model?: Car[];
  user?: User;
  totalRecords: number = 100;
  isHighToLowSorting: boolean = false; // New sorting property

  constructor(private carService: CarService, private authService: AuthService) { }

  ngOnInit(): void {

    this.carService.getAvailableCar().subscribe({
      next: (response) => {
        this.model = response;
        this.totalRecords = this.model.length;
        this.sortCarsByPrice(); 
      }
    });
    
    this.authService.user().subscribe({
      next: (response) => {
        this.user = response;
      }
    });

    this.user = this.authService.getUser();
  }



  toggleSorting(highToLow: boolean) {
    this.isHighToLowSorting = highToLow;
    this.sortCarsByPrice();
  }


  sortCarsByPrice() {
    if (this.model && this.model.length > 0) {
      if (this.isHighToLowSorting) {
        this.model.sort((a, b) => b.pricePerHour - a.pricePerHour); // High to Low
      } else {
        this.model.sort((a, b) => a.pricePerHour - b.pricePerHour); // Low to High
      }
    }
  }
} 