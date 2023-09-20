export interface CreateCarRequest{
    maker : string;
    model: string;
    features:string
    pricePerHour: number;
    isAvailable : boolean;
    agreements : string[];
} 