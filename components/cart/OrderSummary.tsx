import { Grid, Typography } from "@mui/material"

const OrderSummary = () => {
  return (
    <Grid container>
      <Grid item xs={6}>
        <Typography>No. Product</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>3 items</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>SubTotal</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>{`$${155.36}`}</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>Taxes(16%)</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>{`$${19.36}`}</Typography>
      </Grid>
      <Grid item xs={6} sx={{ mt: 2 }}>
        <Typography>Total</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end" sx={{ mt: 2 }}>
        <Typography variant="subtitle1">{`$${180.3}`}</Typography>
      </Grid>
    </Grid>
  );
}

export default OrderSummary