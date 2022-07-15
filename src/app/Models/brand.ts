import { Offer } from "./offer";

export interface Brand {
    id?:string,
    Name: string,
    Logo:File | string,
    // overView:string,
    Categoris:string[],
    Products?:string[],
    offers: Offer[]
}