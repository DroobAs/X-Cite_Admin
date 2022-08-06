export interface Product {
    id?: string,
    name: string,
    brandName:string,
    description:string,
    quantity: number,
    price: number,
    discount:number,
    images: string[],
    sku:string,
    categoryName:string,
    seller:string,
    imgsDescription?: string[],
}
