import { FC, useContext, useEffect } from 'react'
import NextLink from 'next/link'
import { Grid, Typography, Link, CardActionArea, CardMedia, Button } from "@mui/material"
import { Box } from "@mui/system"
import ItemCounter from "../ui/ItemCounter"
import { CartContext, ICartProduct } from '../../context'



interface Props {
  editable: boolean
}
const CartList: FC<Props> = ({ editable = false }) => {

  const  { cart,updateCartQuantity, deleteProductInCart }=useContext(CartContext);

  const onAddCartQuantity = (product:ICartProduct)=>{
    updateCartQuantity(product,product.quantity +1)
  }

  const onSubtractQuantity=(product:ICartProduct)=>{
    updateCartQuantity(product,product.quantity -1)
  }


  return (
    <>
      {cart.map((product,i) => (
        <Grid container key={`${product.slug}-${i}`} spacing={2} sx={{ mb: 1 }}>
          <Grid item xs={3}>
            {/**TODO take it to the product page */}
            <NextLink href={`/product/${product.slug}`} passHref>
              <Link>
                <CardActionArea>
                  <CardMedia
                    image={`/products/${product.images}`}
                    component="img"
                    sx={{ borderRadius: "5px" }}
                  ></CardMedia>
                </CardActionArea>
              </Link>
            </NextLink>
          </Grid>
          <Grid item xs={7}>
            <Box display="flex" flexDirection="column">
              <Typography variant="body1">{product.title}</Typography>
              <Typography variant="body2">
                Size: <strong> {product.size} </strong>
              </Typography>
              {/**condicional */}
              {editable ? (
                <ItemCounter
                updatedQuantity={product.quantity}
                
                onAddQuantity={()=>onAddCartQuantity(product)}

                onDecreaseQuantity={()=>onSubtractQuantity(product)}

                isMaxReached={false} />
              ) : (
                <Typography variant="h5">{product.quantity} {product.quantity > 1 ? 'Items': 'Item'}  </Typography>
              )}
            </Box>
          </Grid>
          <Grid
            item
            xs={2}
            display="flex"
            alignItems="center"
            flexDirection="column"
          >
            <Typography variant="subtitle1">{`$${product.price * product.quantity}`}</Typography>
            {editable && (
              <Button variant="text" color="secondary"onClick={()=>deleteProductInCart(product)} >
                Remove
              </Button>
            )}
          </Grid>
        </Grid>
      ))}
    </>
  );
}

export default CartList