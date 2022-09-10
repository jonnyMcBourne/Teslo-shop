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

export interface IcartSummary{
  quantityOfIttems: number;
  subTotal: number;
  tax: number;
  total: number;
}
type IGender = 'men'|'women'|'kid'|'unisex'
export type ISizes = undefined|'XS'|'S'|'M'|'L'|'XL'|'XXL'|'XXXL';

interface ContextProps {
  cart: ICartProduct[];
  cartIsLoaded:boolean;
  cartSummary:IcartSummary;
  addProductToCart:(product:ICartProduct)=>void
  updateCartQuantity:(product:ICartProduct,quantity:number)=>void
  deleteProductInCart:(product:ICartProduct)=>void
}

export const CartContext = createContext({} as ContextProps);