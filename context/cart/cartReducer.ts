import { IcartSummary, ICartProduct } from './CartContext';
import { cartInitialState } from './CartProvider';

type action =
  | {
      type: '[cart] - LoadCart from cookies | storage';
      payload: ICartProduct[];
    }
  | {
      type: '[cart] - update Product-in-cart';
      payload: ICartProduct[];
    }
  | {
      type: '[cart] - updatequantity-in-product-cart';
      payload: ICartProduct[];
    }
  | {
      type: '[cart] - delete-product-cart';
      payload: ICartProduct[];
    }
    | {
      type: '[cart] - update-order-summary';
      payload: IcartSummary
    }

export const CartReducer = (state = cartInitialState, action: action) => {
  switch (action.type) {
    case '[cart] - LoadCart from cookies | storage':
      return {
        ...state,
        cart: [...action.payload],
      };
    case '[cart] - update Product-in-cart':
      return {
        ...state,
        cart: [...action.payload],
      };
    case '[cart] - updatequantity-in-product-cart':
        return {
            ...state,
            cart: [...action.payload],
        }
      case '[cart] - delete-product-cart':
        return{
          ...state,
          cart:action.payload
        }
      case '[cart] - update-order-summary':
        return {
          ...state,
          cartSummary: action.payload
        }

    default:
      return { ...state };
  }
};
