import { Component, OnDestroy, OnInit } from '@angular/core';
import { AgreementService } from '../services/agreement.service';
import { Agreement } from '../models/agreement.model';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';
import { User } from '../../auth/models/user.model';
import { ToastrService } from 'ngx-toastr';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-user-agreements',
  templateUrl: './user-agreements.component.html',
  styleUrls: ['./user-agreements.component.css']
})
export class UserAgreementsComponent implements OnInit {

  agreements$?: Observable<Agreement[]>;
  agreements : Agreement[] =[];
  user?:User ;
  userReturnRequested : boolean = false;
  routeSubscription?: Subscription
  
  constructor(private agreementService: AgreementService,private authService: AuthService,private toastr: ToastrService,private router:Router) { }


  ngOnInit(): void {
    //console.log(this.email);
    this.user = this.authService.getUser();
    if(this.user?.userId){
      this.agreements$ = this.agreementService.userAgreements(parseInt(this.user.userId));
     
      this.agreements$.subscribe((products) => {
        this.agreements = products;
     });
   }
  }

  requestReturn(agreementId : string,existingAgreement: Agreement){
    this.userReturnRequested = true;
    //call api function to edit this agreement 
   
    this.agreementService.updateReturnRequest(agreementId,existingAgreement).subscribe({
      next:(response)=>{
        this.toastr.success('Your request is successfully sent to admin');
      //   this.router.navigateByUrl(`/youragreements/${this.user?.userId}`, { skipLocationChange: true }).then(() => {
      //     this.router.navigate([`/youragreements/${this.user?.userId}`]);
      // }); 
      this.ngOnInit();
      }
    })
  }



}
