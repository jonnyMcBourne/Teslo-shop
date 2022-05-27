import { FC, PropsWithChildren, useReducer } from 'react'
import { CartContext, CartReducer, ICartProduct } from './' 

export interface ICartState {
  cart: ICartProduct[]
}
export const cartInitialState: ICartState = {
  cart:[],
};
export const CartProvider:FC<PropsWithChildren<{}>> = ({children}) => {
const [state, dispatch] = useReducer(CartReducer, cartInitialState);
  return (
    <CartContext.Provider value={{...state}} >
      {children}
    </CartContext.Provider>
  )
}