import { Grid, Typography } from "@mui/material"
import { useContext } from "react";
import { CartContext } from "../../context";
import { currency } from '../../utils';
const OrderSummary = () => {
  const {cartSummary}= useContext(CartContext);
  
  return (
    <Grid container>
      <Grid item xs={6}>
        <Typography>No. Product</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>{cartSummary.quantityOfIttems}</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>SubTotal</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>{ currency.format(cartSummary.subTotal)}</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>Taxes({Number(process.env.NEXT_PUBLIC_TAX_RATE) * 100}%)</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>{ currency.format(cartSummary.tax)}</Typography>
      </Grid>
      <Grid item xs={6} sx={{ mt: 2 }}>
        <Typography>Total</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end" sx={{ mt: 2 }}>
        <Typography variant="subtitle1">{currency.format( cartSummary.total)}</Typography>
      </Grid>
    </Grid>
  );
}

export default OrderSummary