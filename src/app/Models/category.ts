export interface Category {
    id:string;
    name:string;
    discount:number;
    img: string;
    subcollections:string[];
    Published?:boolean
}