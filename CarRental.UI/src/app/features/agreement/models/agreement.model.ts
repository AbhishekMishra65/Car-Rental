export interface Agreement{
    agreementId : string;
    userId : number;
    carVehicleId:string;
    fromDate: Date;
    toDate: Date;
    totalPrice: number;
    returnRequested: boolean;
    adminConfirmReturned: boolean;
}