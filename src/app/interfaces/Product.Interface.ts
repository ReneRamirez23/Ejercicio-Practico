import { RatingInterface } from "./Rating.Interface";

export  interface ProductInterface{

    id: number,
    title: string,
    price: number,
    description: string,
    category: string,
    image: string,
    rating: RatingInterface,

}