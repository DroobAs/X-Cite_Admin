export interface Brand {
    id?:string,
    Name: string,
    Logo:string,
    // overView:string,
    Categoris:string[],
    Products:string[],
    offers:[{
        imgOffer:string,
        offerInfo:string
    }]
}