import { ICartProduct } from "./CartContext"
import { cartInitialState } from "./CartProvider"

type action =
  | {
      type: "[cart] - LoadCart from cookies | storage";
      payload: ICartProduct[];
    }
  | {
      type: "[cart] - Add Product";
      payload: ICartProduct;
    };

export const CartReducer = (state=cartInitialState, action:action) =>{
    switch (action.type) {
        case "[cart] - LoadCart from cookies | storage" :
            return {...state}

        default:
            return {...state}
    }
}