import { FC, useContext, useEffect } from "react"
import { useRouter } from "next/router";

import { Box, Button, Card, CardContent, Divider, Grid, Typography } from "@mui/material"
import CartList from "../../components/cart/CartList";
import OrderSummary from "../../components/cart/OrderSummary";
import ShopLayout from "../../components/layout/ShopLayout"
import { CartContext } from "../../context";

interface Props {

}
const Cart: FC<Props> = ({ }) => {

  const { cart, cartIsLoaded } = useContext(CartContext);
  const { push, replace } = useRouter();

  useEffect(() => {
    if (cart?.length <= 0 && cartIsLoaded) {
      replace('/cart/empty')
    }
  }, [cart?.length, cartIsLoaded])

  const checkout = () => {
    push('/checkout/summary')
  }

  if (cart.length <= 0) {
    console.log('cartisloaded', cartIsLoaded);
    return (<></>)
  }

  return (
    <ShopLayout title="Cart - 3" pageDescription="shopping cart">
      <Typography variant="h1" component="h1">
        Cart
      </Typography>
      <Grid container>
        <Grid item xs={12} sm={7}>
          <CartList editable />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className="summary-card">
            <CardContent>
              <Typography variant="h2"> Order</Typography>
              <Divider sx={{ my: 1 }} />
              <OrderSummary />
              <Box sx={{ mt: 3 }}>
                <Button
                  color="secondary"
                  className="circular-btn"
                  fullWidth
                  onClick={checkout}
                >
                  Checkout
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
}

export default Cart