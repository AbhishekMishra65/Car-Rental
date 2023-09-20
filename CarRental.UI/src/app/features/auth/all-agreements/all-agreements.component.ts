import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Agreement } from '../../agreement/models/agreement.model';
import { User } from '../models/user.model';

@Component({
  selector: 'app-all-agreements',
  templateUrl: './all-agreements.component.html',
  styleUrls: ['./all-agreements.component.css']
})
export class AllAgreementsComponent implements OnInit {
  agreements$?: Observable<Agreement[]>;
  agreements: Agreement[] = [];
  user?: User;
  userReturnRequested: boolean = false;
  routeSubscription?: Subscription

  constructor(private authService: AuthService, private toastr: ToastrService, private router: Router) {

  }

  ngOnInit(): void {
    this.agreements$ = this.authService.allAgreements();
     
      this.agreements$.subscribe((products) => {
        this.agreements = products;
     });
  }

  adminRequestReturn(agreementId: string, existingAgreement: Agreement) {
    this.authService.updateAdminAcceptReturn(agreementId, existingAgreement).subscribe({
      next: (response) => {
        this.toastr.success('Your car is successfully returned');
        this.ngOnInit();
      }
    })
  }

}
