import { Agreement } from "../../agreement/models/agreement.model";

export interface Car{
    vehicleId: string;
    maker: string;
    model: string;
    features: string;
    isAvailable: boolean;
    pricePerHour: number;
    agreements : Agreement[];
}