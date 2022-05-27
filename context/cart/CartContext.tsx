import { createContext } from 'react';

export interface ICartProduct{
    _id:string
    images: string;
    price: number;
    size?: ISizes;
    slug: string;
    title: string;
    gender: IGender;
    quantity:number
}
type IGender = 'men'|'women'|'kid'|'unisex'
export type ISizes = undefined|'XS'|'S'|'M'|'L'|'XL'|'XXL'|'XXXL';

interface ContextProps {
  cart: ICartProduct[];
}

export const CartContext = createContext({} as ContextProps);