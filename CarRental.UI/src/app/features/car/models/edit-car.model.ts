import { Agreement } from "../../agreement/models/agreement.model";

export interface EditCar{
    vehicleId: string;
    maker: string;
    model: string;
    features: string;
    isAvailable: boolean;
    pricePerHour: number;
    agreements : Agreement[];
}