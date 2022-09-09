import { FC, PropsWithChildren, useEffect, useReducer, useRef } from 'react'
import Cookie from 'js-cookie';
import { CartContext, CartReducer, ICartProduct, IcartSummary } from './'


export interface ICartState {
  cart: ICartProduct[]
  cartSummary: IcartSummary
}
export const cartInitialState: ICartState = {
  cart: [],
  cartSummary:{
    quantityOfIttems:0,
    subTotal:0,
    tax:0,
    total:0
  }
};


export const CartProvider: FC<PropsWithChildren<{}>> = ({ children }) => {

  const [state, dispatch] = useReducer(CartReducer, cartInitialState);


  const cartIsReload = useRef(true)

  useEffect(()=>{
    if(cartIsReload.current){
      cartIsReload.current = false
    }else{
      const initialCart = Cookie.get('cart') ? JSON.parse( Cookie.get('cart')! ) : [] ;
      updateLocalStorage(initialCart)
      dispatch({type:'[cart] - LoadCart from cookies | storage',payload:initialCart})
    }
  },[]);

  useEffect(()=>{
    const quantityOfIttems = state.cart.reduce((prev,current)=>current.quantity + prev,0);
    const subTotal = state.cart.reduce((prev,current)=>(current.price * current.quantity) + prev,0)
    const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0 )

    const cartSummary:IcartSummary = {
      quantityOfIttems,
      subTotal,
      tax: Number((subTotal * taxRate).toFixed(2)),
      total:Number(((subTotal * taxRate ) + subTotal).toFixed(2)) 
    }
    dispatch({type:'[cart] - update-order-summary',payload:cartSummary});
  },[state.cart])


  const updateLocalStorage =(newCart:ICartProduct[])=>{
    Cookie.set('cart',JSON.stringify(newCart))
  }

  const addProductToCart = (product: ICartProduct) => {
    //verify if the product and size already exist in cart
    const productInCart = state.cart.some(p => p._id === product._id && p.size === product.size)
    if (!productInCart){
      const newProduct = [...state.cart,product]
      updateLocalStorage(newProduct)
      return dispatch({ type: '[cart] - update Product-in-cart', payload: newProduct })
    } 
    //if already exist, update quantity 
    const cartupdated = state.cart.map((item) => {
      if (item._id !== product._id) return item
      if (item.size !== product.size) return item
      return { ...item, quantity: product.quantity + item.quantity }
    })
    updateLocalStorage(cartupdated)
    return dispatch({ type: '[cart] - update Product-in-cart', payload: cartupdated })
  }

  const updateCartQuantity = (product:ICartProduct,quantity:number) =>{
    const newCartQuantity=state.cart.map(productInCart=>{
      if(product._id !== productInCart._id) return productInCart
      if(product.size !== productInCart.size) return productInCart
      productInCart.quantity = quantity <= 1? 1:quantity
      return productInCart
    })
    updateLocalStorage(newCartQuantity)
    dispatch({type:'[cart] - updatequantity-in-product-cart',payload:newCartQuantity})
  }

  const deleteProductInCart = (product:ICartProduct)=>{
    const newCartArray = state.cart.filter((productInCart)=> !(productInCart._id == product._id && productInCart.size === product.size) )
    updateLocalStorage(newCartArray)
    dispatch({type:'[cart] - delete-product-cart',payload:newCartArray});
  }

  return (
    <CartContext.Provider value={{ ...state, addProductToCart, updateCartQuantity,deleteProductInCart }} >
      {children}
    </CartContext.Provider>
  )
}